from manage import db
import datetime
from utils import dump_datetime


followers = db.Table('followers',
    db.Column('follower_username', db.String(50), db.ForeignKey('user.username')),
    db.Column('followed_username', db.String(50), db.ForeignKey('user.username'))
)

class User(db.Model):
    __tablename__ = 'user'
    username = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    player_type = db.Column(db.String(25), nullable=False, default='player')
    avatar = db.Column(db.Text, default='')
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    stats = db.relationship('Stats', backref=db.backref('user'), uselist=False)
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_username == username),
        secondaryjoin=(followers.c.followed_username == username),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_username == user.username).count() > 0

    def followed_an_followers(self):
        return list(map(lambda u: u.username, self.followed.all())), list(map(lambda u: u.username, self.followers.all()))

class Stats(db.Model):
    username = db.Column(db.String(50), db.ForeignKey('user.username'), primary_key=True )
    games = db.Column(db.Integer, default=0)
    wins = db.Column(db.Integer, default=0)
    last_login = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    streak = db.Column(db.Integer, default=0)
    cash = db.Column(db.Integer, default= 10000)

    @property
    def serialize(self):
       """Return object data in easily serializeable format"""
       return {
           'games': self.games,
           'last_login': dump_datetime(self.last_login),
           'wins' : self.wins,
           'streak' : self.streak,
           'cash' : self.cash
       }

'''
class payment(db.Model):
    pass

class lobbies(db.Model):
    pass

class activeplayers(db.Model):
    pass
'''