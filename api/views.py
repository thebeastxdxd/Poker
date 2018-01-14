from app import app
from flask import make_response, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from models import *
import jwt
import datetime

users = ['admin']



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
        

    #check_password_hash(user.password,  auth['password'])
    if user.password == auth['password']:
        token = jwt.encode({'email' : user.email, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
    
    return jsonify({'token' : token.decode('UTF-8')})



    return make_response('could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    