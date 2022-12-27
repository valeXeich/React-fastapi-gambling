from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


class UserBalance(BaseModel):
    balance: int


class UserShow(BaseModel):
    username: str

    class Config:
        orm_mode = True
    