from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    username: str
    password: str


class UserBalance(BaseModel):
    balance: int


class UserShow(BaseModel):
    username: str

    class Config:
        orm_mode = True
    

class Messages(BaseModel):
    username: str
    message: str
    time: str

    class Config:
        orm_mode = True