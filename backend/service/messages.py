from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models import Message


async def create_message(user_id: int, message: str, session: AsyncSession):
    msg = Message(message=message, user=user_id)
    session.add(msg)
    await session.commit()

async def get_messages(session: AsyncSession):
    query = select(Message).limit(10)
    result = await session.execute(query)
    return result.scalars().all()