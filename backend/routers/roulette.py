from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from service.roulette import get_last_results
from typing import List
from schemas import roulette

router = APIRouter()

@router.get('/get-results', response_model=List[roulette.Result])
async def get_results(session: AsyncSession= Depends(get_session)):
    last_results = await get_last_results(session)
    return last_results