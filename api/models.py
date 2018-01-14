from app import db


class User(db.Model):
    username = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    avatar = db.Column(db.Text, default='')
    created_date = db.Column(db.DateTime, nullable=False)
    stats = db.relationship('Stats', backref=db.backref('user'), uselist=False)


class Stats(db.Model):
    username = db.Column(db.String(50), db.ForeignKey('user.username'), primary_key=True )
    games = db.Column(db.Integer, default=0)
    wins = db.Column(db.Integer, default=0)
    last_login = db.Column(db.DateTime)
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