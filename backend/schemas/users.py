from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


class UserShow(BaseModel):
    username: str

    class Config:
        orm_mode = True
    