import sqlite3

from src.configs import settings


def get_db_connection():
    conn = sqlite3.connect(settings.database_url, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def get_db_cursor():
    conn = get_db_connection()
    return conn.cursor()
