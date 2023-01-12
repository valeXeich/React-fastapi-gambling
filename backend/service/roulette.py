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
    return seed


async def check_seeds(session: AsyncSession):
    query = select(Seed).order_by(Seed.id.desc())
    seeds = await session.execute(query)
    all_seeds = seeds.all()
    last_seed = None
    if not all_seeds:
        last_seed = await create_seed(session)
    else:
        today = date.today()
        last_seed = all_seeds[0][0]
        if last_seed.created_date.date() != today:
            await create_seed(session)
    return last_seed



async def get_round(session: AsyncSession):
    query = select(Result).order_by(Result.id.desc()).limit(1)
    execute = await session.execute(query)
    try:
        round_ = execute.fetchone()[0].round
    except IndexError:
        return
    return round_


async def get_last_results(session: AsyncSession):
     query = select([Result]).order_by(Result.id.desc()).limit(5)
     result = await session.execute(query)
     last_10_results = result.fetchall()
     if not len(last_10_results):
        return []
     last_10_results = [{"number": result[0].number} for result in last_10_results]
     return last_10_results[::-1]

async def save_result(round: int, number: int, session: AsyncSession):
    res = Result(round=round, number=number)
    session.add(res)
    await session.commit()
