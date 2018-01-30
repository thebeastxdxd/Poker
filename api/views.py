from manage import app
from flask import make_response, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from models import *
import jwt
import datetime
from schemas import *
from functools import wraps
import base64
from utils import path_to_base64_avatar, username_to_base64_avatar, resize_image
 
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
    
    user = User.query.filter_by(username=data['userName']).first()
    if not user:
        return  jsonify({'user': {'errors': {'global': 'Username doesn\'t exist'}}}), 400
    if not data['imageUrl']:
         return  jsonify({'user': {'errors': {'global': 'incorrect image'}}}), 400

    imgdata = data['imageUrl'].split(',')[1]
    imgdata = base64.decodebytes(imgdata.encode())
    filename = 'avatars/{0}_avatar.jpg'.format(data['userName']) 
    user.avatar = filename

    with open(filename, 'wb') as f:
        f.write(imgdata)
    resize_image(filename)
    user_image = username_to_base64_avatar(data['userName'])
    return jsonify({'user': { 'avatar': data['imageUrl']}})

    
@app.route('/api/profile/<userName>', methods=['GET'])
def get_user_info(userName):

    user = User.query.filter_by(username=userName).first()

    if not user:
        return jsonify({'user': {'errors': {'global': 'User doesn\'t exist'}}}), 401

    user_stats = user.stats.serialize
    user_type = user.player_type

    if not user.avatar:
        user_image = username_to_base64_avatar(userName)
    else:
        user_image = path_to_base64_avatar(user.avatar)
    print(user_image)
    return jsonify({'user': {'player_type': user_type, 'avatar': user_image.decode('ascii'), 'stats': user_stats}})
