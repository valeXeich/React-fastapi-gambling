from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models import User


async def create_users(username: str, password: str, session: AsyncSession):
    result = User(username=username, password=password)
    session.add(result)
    await session.commit()
    return result

async def get_user(username: str, session):
    query = select(User).where(User.username==username)
    result = await session.execute(query)
    return result.scalars().first()
    