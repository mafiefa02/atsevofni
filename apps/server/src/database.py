from sqlite3 import Connection, Row, connect

from src.configs import settings

conn: Connection = None


def get_db_connection() -> Connection:
    return conn


def connect_to_db():
    global conn
    conn = connect(settings.database_url, check_same_thread=False)
    conn.row_factory = Row


def close_db_connection():
    global conn
    if conn:
        conn.close()
