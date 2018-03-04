"""empty message

Revision ID: 1a1b2ee1634b
Revises: 
Create Date: 2018-02-26 19:38:10.730116

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '1a1b2ee1634b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('lobbies')
    op.drop_table('payment')
    op.drop_table('users')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('Username', mysql.VARCHAR(length=50), nullable=False),
    sa.Column('Password', mysql.VARCHAR(length=45), nullable=False),
    sa.Column('Email', mysql.VARCHAR(length=45), nullable=False),
    sa.Column('Avatar', mysql.VARCHAR(length=200), nullable=True),
    sa.PrimaryKeyConstraint('Username'),
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
    # ### end Alembic commands ###
