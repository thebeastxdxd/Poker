from app import app
from flask import make_response, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from models import *
import jwt
import datetime
from schemas import *
from jsonschema  import Draft4Validator
from functools import wraps

def validate_schema(schema):


    def wrapper(fn):
        @wraps(fn)
        def wrapped(*args, **kwargs):
            input = request.get_json(force=True)
            date, errors = schema.load(input)
            print(errors)
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
        return make_response('could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    auth = auth['credentials']
    if not auth or not auth['userName'] or not auth['password']:
        return make_response('could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    
    user = User.query.filter_by(username=auth['userName']).first()

    if not user:
        return make_response('could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
        

    
    if check_password_hash(user.password,  auth['password']):
        token = jwt.encode({'email' : user.email, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
    
    return jsonify({'token' : token.decode('UTF-8'), 'userName': auth['userName']})



    return make_response('could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})


@app.route('/api/registrate', methods=['Post'])
@validate_schema(UserWrapper())
def create_user():
    data = request.get_json()
    if not data['user']:
        return jsonify({'errors': {'user': {'global': 'incorrect format'}}}), 400
    
    data = data['user']
    if User.query.filter_by(username=data['userName']).first():
        return  jsonify({'errors': {'user': {'userName': 'Username already taken.'}}}), 409

    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user_stats = Stats(username=data['userName'])
    new_user = User(username=data['userName'], password=hashed_password, email=data['email'], stats=new_user_stats)

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message' : 'New user created!'})





