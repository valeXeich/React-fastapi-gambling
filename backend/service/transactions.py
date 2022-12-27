from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from service.users import get_user
from models import Transaction


async def get_balance(username: str, session: AsyncSession):
    user = await get_user(username, session)
    query = select(Transaction).where(Transaction.user==user)
    transactions = await session.execute(query)
    transactions = transactions.scalars().all()
    result = sum([transaction.value for transaction in transactions])
    return {'balance': result}


async def change_balance(total_lost, total_victory, username, session):
    user = await get_user(username, session)
    result = total_victory - total_lost
    transaction = Transaction(value=result, user_id=user.id)
    session.add(transaction)
    await session.commit()
    return transaction
