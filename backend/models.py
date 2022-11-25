from sqlalchemy import Column, String, Integer
from database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)















# async def init_models():
#     async with engine.begin() as conn:
#         #await conn.run_sync(Base.metadata.drop_all)
#         await conn.run_sync(Base.metadata.create_all)


# asyncio.run(init_models())