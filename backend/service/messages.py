from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from models import Message


async def create_message(user_id: int, message: str, session: AsyncSession):
    msg = Message(message=message, user_id=user_id)
    session.add(msg)
    await session.commit()


async def get_messages(session: AsyncSession):
    query = select(Message).limit(10).options(selectinload(Message.user))
    result = await session.execute(query)
    messages = [{
        'username': message.user.username, 
        'message': message.message, 
        'time': message.created_date.strftime('%H:%M')
        } for message in result.scalars().all()
    ]
    return messages