"""empty message

Revision ID: 5c276f384b8f
Revises: 0b091f903fb0
Create Date: 2023-01-26 15:38:23.390846

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5c276f384b8f'
down_revision = '0b091f903fb0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Empresa', schema=None) as batch_op:
        batch_op.drop_column('numero_trab')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Empresa', schema=None) as batch_op:
        batch_op.add_column(sa.Column('numero_trab', sa.INTEGER(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
