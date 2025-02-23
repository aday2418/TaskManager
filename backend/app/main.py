from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes
import uvicorn

app = FastAPI()

#This would need updating if I were to deploy the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
