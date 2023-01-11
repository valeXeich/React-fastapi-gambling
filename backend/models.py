from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    transaction = relationship("Transaction", back_populates="user")
    message = relationship('Message', back_populates='user')


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    value = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', back_populates="transaction")


class Seed(Base):
    __tablename__ = 'seeds'

    id = Column(Integer, primary_key=True, index=True)
    server_seed = Column(String, nullable=False)
    public_seed = Column(String, nullable=False)
    created_date = Column(DateTime(timezone=True), server_default=func.now())


class Result(Base):
    __tablename__ = 'results'

    id = Column(Integer, primary_key=True, index=True)
    round = Column(Integer, nullable=False)
    number = Column(Integer, nullable=False)


class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', back_populates="message")
    created_date = Column(DateTime(timezone=True), server_default=func.now())



# import asyncio


# async def init_models():
#     async with engine.begin() as conn:
#         await conn.run_sync(Base.metadata.drop_all)
#         await conn.run_sync(Base.metadata.create_all)


# asyncio.run(init_models())