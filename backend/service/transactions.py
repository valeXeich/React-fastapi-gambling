from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models import Transaction


async def get_balance(username: str, session: AsyncSession):
    query = select(Transaction).where(Transaction.user.username==username)
    transactions = await session.execute(query).scalars().all()
    result = sum([transaction.value for transaction in transactions])
    return result
