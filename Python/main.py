from datetime import datetime, timezone
import pandas as pd
import mysql.connector
from mysql.connector import Error
import logging

# Configure logging
logging.basicConfig(level=logging.ERROR)

EXCEL_FILE = "aiplp-data-for-cs-fields.xlsx"
HOST = ""
USER = ""
PASSWORD = ""
DB_NAME = ""

def create_connection():
    """Create a database connection."""
    try:
        return mysql.connector.connect(
            host=HOST,
            user=USER,
            password=PASSWORD,
            database=DB_NAME
        )
    except Error as e:
        logging.error(f"The error '{e}' occurred")
        return None

def execute_query(query, params=None):
    """Execute a single query."""
    connection = create_connection()
    if connection is None:
        return None
    try:
        with connection.cursor() as cursor:
            cursor.execute(query, params)
            connection.commit()
            return cursor.lastrowid
    except Error as e:
        logging.error(f"The error '{e}' occurred")
        print('\n\n\n', query, params, '\n\n\n')
        return None
    finally:
        connection.close()

def fetch_one(query, params=None):
    """Fetch a single result."""
    connection = create_connection()
    if connection is None:
        return None
    try:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(query, params)
            result = cursor.fetchone()
            # Ensure all results are read
            while cursor.nextset():
                pass
            return result
    except Error as e:
        logging.error(f"The error '{e}' occurred")
        print('\n\n\n', query, params, '\n\n\n')
        return None
    finally:
        connection.close()

def process_dataframe(df):
    """Process the DataFrame and return a structured result."""
    df = df.ffill()  # Replace deprecated fillna method
    result = {"Fields": []}

    for field, field_group in df.groupby("Fields"):
        field_dict = {"title": field, "Courses": []}
        for course, course_group in field_group.groupby("Courses"):
            course_dict = {"title": course, "Chapters": []}
            for chapter, chapter_group in course_group.groupby("Chapters"):
                topics = chapter_group["Topics"].dropna().tolist()
                chapter_dict = {"title": chapter, "Topics": topics}
                course_dict["Chapters"].append(chapter_dict)
            field_dict["Courses"].append(course_dict)
        result["Fields"].append(field_dict)

    return result

def insert_if_not_exists(table, title, foreign_key_column=None, foreign_key_value=None, order_number=None):
    """Insert a record if it does not exist."""
    # Use timezone-aware datetime
    timestamp = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
        
    if foreign_key_column and foreign_key_value:
        select_query = f"SELECT id FROM {table} WHERE title=%s and {foreign_key_column} = '{foreign_key_value}'"
        insert_query = f"INSERT INTO {table} (id, title, {foreign_key_column}, createdAt, updatedAt) VALUES (UUID(), %s, %s, %s, %s)"
        params = (title, foreign_key_value, timestamp, timestamp)
    else:
        select_query = f"SELECT id FROM {table} WHERE title=%s"
        insert_query = f"INSERT INTO {table} (id, title, createdAt, updatedAt) VALUES (UUID(), %s, %s, %s)"
        params = (title, timestamp, timestamp)

    if order_number and foreign_key_column and foreign_key_value:
        insert_query = f"INSERT INTO {table} (id, title, `order`, createdAt, updatedAt) VALUES (UUID(), %s, %s, %s, %s)"
        insert_query = f"INSERT INTO {table} (id, title, `order`, {foreign_key_column}, createdAt, updatedAt) VALUES (UUID(), %s, %s, %s, %s, %s)"
        params = (title, str(n), foreign_key_value, timestamp, timestamp)
    
    existing_record = fetch_one(select_query, (title,))
    if existing_record:
        return existing_record["id"]
    else:
        execute_query(insert_query, params)
        # Get the newly inserted record
        return fetch_one(select_query, (title,))["id"]

if __name__ == "__main__":
    df = pd.read_excel(EXCEL_FILE)
    structured_data = process_dataframe(df)

    for field in structured_data['Fields']:
        field_id = insert_if_not_exists('Fields', field['title'])
        print(f"{field['title']}")
        for course in field['Courses']:
            course_id = insert_if_not_exists('Courses', course['title'], 'fieldId', field_id)
            print(f"\t{course['title']}")
            n = 1
            for chapter in course['Chapters']:
                chapter_id = insert_if_not_exists('Chapters', chapter['title'], 'courseId', course_id, n)
                print(f"\t\t{chapter['title']}")
                n += 1
                for topic in chapter['Topics']:
                    topic_id = insert_if_not_exists('Topics', topic, 'chapterId', chapter_id)
                    print(f"\t\t\t{topic}")
