from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app.database import get_session
from app.models import User
from ..auth import create_access_token, hash_password, verify_password

router = APIRouter()


@router.post("/register")
def register(username: str, password: str, db: Session = Depends(get_session)):
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username Already Exists")
    
    user = User(username=username, password_hash=hash_password(password))
    db.add(user)
    db.commit()
    return {"message": "Registered Successfully"}

@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_session)):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid Username Or Password")
    
    token = create_access_token(user.user_id)
    return {"access_token": token, "token_type": "bearer", "message": "Successful Login!"}