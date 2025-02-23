from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_session
from app.models import User
from ..auth import create_access_token, hash_password, verify_password

router = APIRouter()

class AuthRequest(BaseModel):
    username: str
    password: str


@router.post("/register")
def register(user: AuthRequest, db: Session = Depends(get_session)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username Already Exists")
    
    userVal = User(username=user.username, password_hash=hash_password(user.password))
    db.add(userVal)
    db.commit()
    return {"message": "Registered Successfully"}

@router.post("/login")
def login(user: AuthRequest, db: Session = Depends(get_session)):
    userVal = db.query(User).filter(User.username == user.username).first()
    if not user or not verify_password(user.password, userVal.password_hash):
        raise HTTPException(status_code=401, detail="Invalid Username Or Password")
    
    token = create_access_token(userVal.user_id)
    return {"access_token": token, "token_type": "bearer", "message": "Successful Login!"}