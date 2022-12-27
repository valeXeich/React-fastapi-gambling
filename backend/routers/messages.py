from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from service.messages import get_messages


router = APIRouter()


@router.get('/messages', status_code=status.HTTP_200_OK)
async def get_last_messages(session: AsyncSession = Depends(get_session)):
    messages = await get_messages(session)
    return [{'key': 'value'}]