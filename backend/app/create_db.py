from app.database import create_tables
from app.models import initialize_lookup_tables

create_tables()
initialize_lookup_tables()