from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from service.users import get_user
from models import Transaction


async def get_balance(username: str, session: AsyncSession, user=None):
    if not user:
        user = await get_user(username, session)
    query = select(Transaction).where(Transaction.user==user)
    transactions = await session.execute(query)
    transactions = transactions.scalars().all()
    result = sum([transaction.value for transaction in transactions])
    return {'balance': result}


async def change_balance(new_balance, username, session):
    user = await get_user(username, session)
    old_balance = await get_balance(username, session, user=user)
    print(new_balance, 'new_balance')
    print(old_balance['balance'], 'old_balance')
    result = new_balance - old_balance['balance']
    transaction = Transaction(value=result, user_id=user.id)
    session.add(transaction)
    await session.commit()
    return transaction


async def deposit(value, username, session):
    user = await get_user(username, session)
    transaction = Transaction(value=value, user_id=user.id)
    session.add(transaction)
    await session.commit()
    return transaction


async def withdraw(value, username, session):
    user = await get_user(username, session)
    transaction = Transaction(value=-value, user_id=user.id)
    session.add(transaction)
    await session.commit()
    return transaction