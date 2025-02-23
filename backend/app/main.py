from fastapi import FastAPI
from app.routes import auth_routes
import uvicorn

app = FastAPI()

app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
