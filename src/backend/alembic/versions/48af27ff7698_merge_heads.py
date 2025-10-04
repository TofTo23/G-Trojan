"""merge heads

Revision ID: 48af27ff7698
Revises: 8bbed05c771c, 8e18d05fbd5f
Create Date: 2025-10-04 18:23:40.107320

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '48af27ff7698'
down_revision: Union[str, Sequence[str], None] = ('8bbed05c771c', '8e18d05fbd5f')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
