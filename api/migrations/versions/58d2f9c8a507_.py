"""empty message

Revision ID: 58d2f9c8a507
Revises: 
Create Date: 2018-01-28 17:47:15.143818

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '58d2f9c8a507'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('users')
    op.drop_table('stats')
    op.drop_table('payment')
    op.drop_table('friends')
    op.drop_table('activeplayers')
    op.drop_table('lobbies')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('lobbies',
    sa.Column('id', mysql.INTEGER(display_width=11), nullable=False),
    sa.Column('type', mysql.VARCHAR(length=45), nullable=False),
    sa.Column('buyin', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('maxbuyin', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('owner', mysql.VARCHAR(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('activeplayers',
    sa.Column('lobbyid', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('username', mysql.VARCHAR(length=100), nullable=False),
    sa.Column('money', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['lobbyid'], ['lobbies.id'], name='lobby_id'),
    sa.ForeignKeyConstraint(['username'], ['users.Username'], name='activeplayer_user'),
    sa.PrimaryKeyConstraint('lobbyid', 'username'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('friends',
    sa.Column('user1', mysql.VARCHAR(length=100), nullable=False),
    sa.Column('user2', mysql.VARCHAR(length=45), nullable=False),
    sa.ForeignKeyConstraint(['user1'], ['users.Username'], name='friends_ibfk_1'),
    sa.ForeignKeyConstraint(['user2'], ['users.Username'], name='friends_ibfk_2'),
    sa.PrimaryKeyConstraint('user1', 'user2'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('payment',
    sa.Column('username', mysql.VARCHAR(length=100), nullable=False),
    sa.Column('creditc', mysql.VARCHAR(length=45), nullable=False),
    sa.Column('exdate', sa.DATE(), nullable=False),
    sa.ForeignKeyConstraint(['username'], ['users.Username'], name='payment_ibfk_1'),
    sa.PrimaryKeyConstraint('username'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('stats',
    sa.Column('username', mysql.VARCHAR(length=50), nullable=False),
    sa.Column('games', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    sa.Column('wins', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    sa.Column('last_login', mysql.DATETIME(), nullable=True),
    sa.Column('streak', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    sa.Column('cash', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['username'], ['user.username'], name='stats_ibfk_1'),
    sa.PrimaryKeyConstraint('username'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('users',
    sa.Column('Username', mysql.VARCHAR(length=50), nullable=False),
    sa.Column('Password', mysql.VARCHAR(length=45), nullable=False),
    sa.Column('Email', mysql.VARCHAR(length=45), nullable=False),
    sa.Column('Avatar', mysql.VARCHAR(length=200), nullable=True),
    sa.PrimaryKeyConstraint('Username'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('user',
    sa.Column('username', mysql.VARCHAR(length=50), nullable=False),
    sa.Column('password', mysql.VARCHAR(length=80), nullable=False),
    sa.Column('email', mysql.VARCHAR(length=120), nullable=False),
    sa.Column('player_type', mysql.VARCHAR(length=25), nullable=False),
    sa.Column('avatar', mysql.TEXT(), nullable=True),
    sa.Column('created_date', mysql.DATETIME(), nullable=False),
    sa.PrimaryKeyConstraint('username'),
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###