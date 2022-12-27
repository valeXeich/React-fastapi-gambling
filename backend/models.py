from sqlalchemy import Column, String, Integer, ForeignKey
from database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    value = Column(Integer, nullable=False)
    username = Column(Integer, ForeignKey('users.id'))


class Result(Base):
    __tablename__ = 'results'

    id = Column(Integer, primary_key=True, index=True)
    server_seed = Column(String, nullable=False)
    public_seed = Column(String, nullable=False)
    round = Column(Integer, nullable=False)
    color = Column(String, nullable=False)
    number = Column(Integer, nullable=False)


class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    user = Column(Integer, ForeignKey('users.id'))










# import asyncio


# async def init_models():
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.drop_all)
#         await conn.run_sync(Base.metadata.create_all)


# asyncio.run(init_models())