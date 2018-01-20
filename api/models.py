from app import db
import datetime

class User(db.Model):
    username = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    player_type = db.Column(db.String(25), nullable=False, default='player')
    avatar = db.Column(db.Text, default='')
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    stats = db.relationship('Stats', backref=db.backref('user'), uselist=False)


class Stats(db.Model):
    username = db.Column(db.String(50), db.ForeignKey('user.username'), primary_key=True )
    games = db.Column(db.Integer, default=0)
    wins = db.Column(db.Integer, default=0)
    last_login = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    streak = db.Column(db.Integer, default=0)
    cash = db.Column(db.Integer, default= 10000)

'''
class friends(db.Model):
    pass

class payment(db.Model):
    pass

class lobbies(db.Model):
    pass

class activeplayers(db.Model):
    pass
'''