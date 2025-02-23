from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_session
from app.models import User
from ..auth import create_access_token, hash_password, verify_password, verify_access_token

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
    return "Registered Successfully"

@router.post("/login")
def login(response: Response, user: AuthRequest, db: Session = Depends(get_session)):
    print("user", user)
    userVal = db.query(User).filter(User.username == user.username).first()
    if not userVal or not verify_password(user.password, userVal.password_hash):
        raise HTTPException(status_code=401, detail="Invalid Username Or Password")
    
    token = create_access_token(userVal.user_id)
    print("login token", token)
    
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,  
        secure=False, #Can't use secure feature w/out deploying on https
        samesite="lax",
    )

    return "Successful Login!"

@router.get("/validate")
def validate_token(request: Request, db: Session = Depends(get_session)):
    print("COOKIES:", request.cookies)
    token = request.cookies.get("access_token")
    print("TOKEN:", token, request.cookies)
    if not token:
        raise HTTPException(status_code=401, detail="No token provided")

    user_id = verify_access_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return {"userId": user_id}