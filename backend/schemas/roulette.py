from pydantic import BaseModel

class Result(BaseModel):
    number: int

    class Config:
        orm_mode = True