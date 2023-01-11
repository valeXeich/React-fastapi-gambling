from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models import Seed, Result
import secrets
import random
from hashlib import sha256
from datetime import date


async def create_seed(session: AsyncSession):
    server_seed_bytes = secrets.token_bytes(4)
    server_seed = str(sha256(server_seed_bytes).hexdigest())
    public_seed = ''.join([str(random.randint(1, 39)) for _ in range(5)])
    seed = Seed(server_seed=server_seed, public_seed=public_seed)
    session.add(seed)
    await session.commit()


async def check_seeds(session: AsyncSession):
    query = select(Seed).order_by(Seed.id.desc())
    seeds = await session.execute(query)
    all_seeds = seeds.all()
    last_seed = all_seeds[0][0]
    if not all_seeds:
        create_seed(session)
    else:
        today = date.today()
        if last_seed.created_date.date() != today:
            create_seed(session)
    return last_seed


async def save_result(round: int, number: int, session: AsyncSession):
    res = Result(round=round, number=number)
    session.add(res)
    await session.commit

async def get_round(session: AsyncSession):
    query = select(Result)
    execute = await session.execute(query)
    print(execute)


async def get_last_results(session: AsyncSession):
    ...
    