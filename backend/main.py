from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, auth, websockets, messages, roulette

app = FastAPI()

app.include_router(users.router, tags=['user'])
app.include_router(auth.router, tags=['auth'])
app.include_router(messages.router, tags=['messages'])
app.include_router(websockets.router, tags=['websockets'])
app.include_router(roulette.router, tags=['roulette'])

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)
