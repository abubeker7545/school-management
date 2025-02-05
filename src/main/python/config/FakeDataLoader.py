import logging
from DatabaseConfig import db
from pathlib import Path
import csv
from sqlalchemy import text
from datetime import datetime

def load_fake_data(app):
    with app.app_context():
        default_fake_data = Path(__file__).resolve().parents[2] / "resources" / "config" / "liquibase" / "data"
        user_fake_data = Path(__file__).resolve().parents[2] / "resources" / "config" / "liquibase" / "fake-data"

        data_load_object = [
            {"table": "jhi_user", "file": "user.csv", "file_location": default_fake_data},
            {"table": "jhi_authority", "file": "authority.csv", "file_location": default_fake_data},
            {"table": "jhi_user_authority", "file": "user_authority.csv", "file_location": default_fake_data},
            {"table": "Person", "file": "Person.csv", "file_location": user_fake_data},
            {"table": "Role", "file": "Role.csv", "file_location": user_fake_data},
            {"table": "UserRole", "file": "UserRole.csv", "file_location": user_fake_data},
            {"table": "Student", "file": "Student.csv", "file_location": user_fake_data},
            {"table": "Teacher", "file": "Teacher.csv", "file_location": user_fake_data},
            {"table": "Administrator", "file": "Administrator.csv", "file_location": user_fake_data},
            {"table": "School", "file": "School.csv", "file_location": user_fake_data},
            {"table": "Subject", "file": "Subject.csv", "file_location": user_fake_data},
            {"table": "Classroom", "file": "Classroom.csv", "file_location": user_fake_data},
            {"table": "ClassSession", "file": "ClassSession.csv", "file_location": user_fake_data},
            {"table": "Attendance", "file": "Attendance.csv", "file_location": user_fake_data},
            {"table": "Exam", "file": "Exam.csv", "file_location": user_fake_data},
            {"table": "Grade", "file": "Grade.csv", "file_location": user_fake_data},
            {"table": "Assignment", "file": "Assignment.csv", "file_location": user_fake_data},
            {"table": "Course", "file": "Course.csv", "file_location": user_fake_data},
            # {"table": "Lesson", "file": "Lesson.csv", "file_location": user_fake_data},
            {"table": "VideoContent", "file": "VideoContent.csv", "file_location": user_fake_data},
            {"table": "Article", "file": "Article.csv", "file_location": user_fake_data},
            {"table": "Resource", "file": "Resource.csv", "file_location": user_fake_data},
            {"table": "LiveSession", "file": "LiveSession.csv", "file_location": user_fake_data},
            {"table": "Discussion", "file": "Discussion.csv", "file_location": user_fake_data},
            {"table": "Comment", "file": "Comment.csv", "file_location": user_fake_data},
            {"table": "Quiz", "file": "Quiz.csv", "file_location": user_fake_data},
            {"table": "Question", "file": "Question.csv", "file_location": user_fake_data},
            {"table": "Submission", "file": "Submission.csv", "file_location": user_fake_data},
            {"table": "CourseEnrollment", "file": "CourseEnrollment.csv", "file_location": user_fake_data},
            {"table": "Feedback", "file": "Feedback.csv", "file_location": user_fake_data},
            {"table": "Certification", "file": "Certification.csv", "file_location": user_fake_data},
            {"table": "Announcement", "file": "Announcement.csv", "file_location": user_fake_data},
            {"table": "Branch", "file": "Branch.csv", "file_location": user_fake_data},
            {"table": "AdministrativeBoard", "file": "AdministrativeBoard.csv", "file_location": user_fake_data},
            {"table": "BoardMember", "file": "BoardMember.csv", "file_location": user_fake_data},
            {"table": "RoleAssignment", "file": "RoleAssignment.csv", "file_location": user_fake_data},
            {"table": "Payment", "file": "Payment.csv", "file_location": user_fake_data},
            {"table": "Invoice", "file": "Invoice.csv", "file_location": user_fake_data},
            {"table": "SubscriptionPlan", "file": "SubscriptionPlan.csv", "file_location": user_fake_data},
            {"table": "SubscriptionDSet", "file": "SubscriptionDSet.csv", "file_location": user_fake_data},
            {"table": "Notification", "file": "Notification.csv", "file_location": user_fake_data},
            {"table": "Message", "file": "Message.csv", "file_location": user_fake_data},
            {"table": "ProgressReport", "file": "ProgressReport.csv", "file_location": user_fake_data},
            {"table": "Recommendation", "file": "Recommendation.csv", "file_location": user_fake_data},
            {"table": "Analytics", "file": "Analytics.csv", "file_location": user_fake_data},
            # pyhipster-needle-user-defined-model-fake-data
        ]

        for data_load in data_load_object:
            table_name = data_load["table"]
            logging.info(f"Checking data load for {table_name}")
            
            # Check if the table is already populated
            result = db.session.execute(text(f"SELECT count(1) FROM {table_name}")).scalar()
            
            if result < 1:
                data_file = data_load["file_location"] / data_load["file"]
                
                if data_file.is_file():
                    logging.info(f"Loading data from {data_file} to table {table_name}")
                    
                    # Open and read the CSV file
                    with open(data_file, mode='r', newline='', encoding='utf-8') as csv_file:
                        reader = csv.DictReader(csv_file, delimiter=";")
                        rows = [row for row in reader]
                    
                    # Insert each row into the table
                    for row in rows:
                        # Convert boolean fields to integers (1 for True, 0 for False) if necessary
                        for key, value in row.items():
                            if value.lower() == 'true':
                                row[key] = 1
                            elif value.lower() == 'false':
                                row[key] = 0
                            
                            # Handle datetime fields by checking if the value exists
                            if key in ['created_date', 'reset_date', 'last_modified_date']:
                                if value:
                                    try:
                                        row[key] = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')  # Convert to datetime if format matches
                                    except ValueError:
                                        row[key] = None  # Set to None if datetime conversion fails
                                else:
                                    row[key] = None  # Set to None if value is empty
                        
                        # Build an insert query dynamically based on row data
                        columns = ', '.join(row.keys())
                        values = ', '.join([f":{key}" for key in row.keys()])
                        insert_query = text(f"INSERT INTO {table_name} ({columns}) VALUES ({values})")
                        db.session.execute(insert_query, row)
                    
                    db.session.commit()  # Commit after all rows are inserted
                else:
                    logging.warning(f"Data file {data_file} does not exist. Skipping this load.")
            else:
                logging.info(f"{table_name} is already populated. Skipping fake data load...")
