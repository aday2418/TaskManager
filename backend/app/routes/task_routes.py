from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
import uuid

from app.database import get_session
from app.models import Task, User
from app.auth import get_current_user

router = APIRouter()

class TaskRequest(BaseModel):
    task_name: str
    task_priority_id: int
    task_status_id: int

@router.post("/")
def add_task(task: TaskRequest, user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    new_task = Task(
        task_id=str(uuid.uuid4()),
        user_id=user.user_id,
        task_name=task.task_name,
        task_priority_id=task.task_priority_id,
        task_status_id=task.task_status_id,
    )

    db.add(new_task)
    db.commit()

    return {"message": "Task added successfully", "task": new_task}

@router.put("/{task_id}")
def edit_task(task_id: str, task: TaskRequest, user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    existing_task = db.query(Task).filter(Task.task_id == task_id, Task.user_id == user.user_id).first()
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found or unauthorized")

    existing_task.task_name = task.task_name
    existing_task.task_priority_id = task.task_priority_id
    existing_task.task_status_id = task.task_status_id

    db.commit()
    return {"message": "Task updated successfully", "task": existing_task}

@router.delete("/{task_id}")
def delete_task(task_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    existing_task = db.query(Task).filter(Task.task_id == task_id, Task.user_id == user.user_id).first()
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found or unauthorized")

    db.delete(existing_task)
    db.commit()

    return {"message": "Task deleted successfully"}

@router.get("/")
def get_tasks(user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    tasks = db.query(Task).filter(Task.user_id == user.user_id).all()
    return {"tasks": tasks}

