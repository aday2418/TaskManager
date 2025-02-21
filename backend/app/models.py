import uuid
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base, get_session

class User(Base):
    __tablename__ = "user"

    user_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)

    tasks = relationship("Task", back_populates="owner", cascade="all, delete")
    
    def set_password(self, password):
        #Need to write this still to hash
        pass

    def check_password(self, password):
        #Need to write this to decode
        pass

class Task(Base):
    __tablename__ = "task"

    task_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = Column(String, ForeignKey("user.user_id", ondelete="CASCADE"), index=True, nullable=False)
    task_name = Column(String, nullable=False)
    task_priority_id = Column(Integer, ForeignKey("task_priority.priority_id"), nullable=False)
    task_status_id = Column(Integer, ForeignKey("task_status.status_id"), nullable=False)

    owner = relationship("User", back_populates="tasks")
    priority = relationship("TaskPriority", back_populates="tasks")
    status = relationship("TaskStatus", back_populates="tasks")

class TaskPriority(Base):
    __tablename__ = "task_priority"

    priority_id = Column(Integer, primary_key=True)
    priority_name = Column(String, unique=True, nullable=False)

    tasks = relationship("Task", back_populates="priority")

class TaskStatus(Base):
    __tablename__ = "task_status"

    status_id = Column(Integer, primary_key=True)
    status_name = Column(String, unique=True, nullable=False)

    tasks = relationship("Task", back_populates="status")

def initialize_lookup_tables():
    session = get_session()  
    try:
        priorities = ["Low", "Medium", "High"]
        for i, name in enumerate(priorities, start=1):
            if not session.query(TaskPriority).filter_by(priority_name=name).first():
                session.add(TaskPriority(priority_id=i, priority_name=name))

        statuses = ["To Do", "In Progress", "Completed"]
        for i, name in enumerate(statuses, start=1):
            if not session.query(TaskStatus).filter_by(status_name=name).first():
                session.add(TaskStatus(status_id=i, status_name=name))

        session.commit()

    except Exception as e:
        session.rollback() 
        print(f"Error Creating Tables: {e}")
    
    finally:
        session.close()




