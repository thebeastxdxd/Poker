from manage import app
from flask import make_response, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from models import *
import jwt
import datetime
from schemas import *
from functools import wraps
import base64
from mimetypes import guess_extension
 
def validate_schema(schema):


    def wrapper(fn):
        @wraps(fn)
        def wrapped(*args, **kwargs):
            input = request.get_json(force=True)
            print(input)
            data, errors = schema.load(input)

            if errors:
                response = jsonify(dict(
                                        message="invalid input",
                                        errors=errors))
                response.status_code = 406
                return response
            else:
                return fn(*args, **kwargs)
        return wrapped
    return wrapper



@app.route('/api/auth', methods=['Post'])
def login():
    auth = request.get_json()

    if not auth['credentials']:
        return jsonify({'user': {'errors': {'global': 'incorrect request info'}}}), 401
        

    auth = auth['credentials']
    if not auth or not auth['userName'] or not auth['password']:
        return jsonify({'user': {'errors': {'global': 'incorrect request info'}}}), 401
    
    user = User.query.filter_by(username=auth['userName']).first()

    if not user:
        return jsonify({'user': {'errors': {'global': 'incorrect username or password'}}}), 401
        

    
    if check_password_hash(user.password,  auth['password']):
        token = jwt.encode({'email' : user.email, 'userName': user.username, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'user' : {'token' : token.decode('UTF-8'), 'userName': auth['userName']}}), 200


    return jsonify({'user': {'errors': {'global': 'incorrect username or password'}}}), 401


@app.route('/api/registrate', methods=['Post'])
@validate_schema(UserWrapper())
def create_user():
    data = request.get_json()
    if not data['user']:
        return jsonify({'user': {'errors': {'global': 'incorrect format'}}}), 400
    
    data = data['user']
    if User.query.filter_by(username=data['userName']).first():
        return  jsonify({'user': {'errors': {'userName': 'Username already taken.'}}}), 409

    hashed_password = generate_password_hash(data['password'], method='sha256') 
    new_user_stats = Stats(username=data['userName'])
    new_user = User(username=data['userName'], password=hashed_password, email=data['email'], stats=new_user_stats)

    db.session.add(new_user)
    db.session.commit()
    
    
    return jsonify({'user' : {'userName': new_user.username}}), 200


@app.route('/api/uploadAvatar', methods=['Post'])
def add_user_avatar():
    data = request.get_json()
    if not data['user']:
        return jsonify({'user': {'errors': {'global': 'incorrect format'}}}), 400
    data = data['user']
    if not User.query.filter_by(username=data['userName']).first():
        return  jsonify({'user': {'errors': {'global': 'Username doesn\'t exist'}}}), 400
    if not data['imageUrl']:
         return  jsonify({'user': {'errors': {'global': 'incorrect image'}}}), 400

    imgdata = base64.b64decode(data['imageUrl'])
    filename = 'avatars/{0}_avatar.{1}}'.format(data['userName'], guess_extension(imgdata)) 
    
    with open(filename, 'wb') as f:
        f.write(imgdata)
    
    return {'user': {'imageUrl': filename, 'image': imgdata}}

    
@app.route('/api/profile/<userName>', methods=['GET'])
def get_user_info(userName):

    user = User.query.filter_by(username=userName).first()

    if not user:
        return jsonify({'user': {'errors': {'global': 'User doesn\'t exist'}}}), 401

    user_stats = user.stats.serialize
    user_type = user.player_type

    return jsonify({'user': {'player_type': user_type, 'stats': user_stats}})
