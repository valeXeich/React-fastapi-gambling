from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from schemas import users
from auth.password_hash import hash_pass
from service.users import create_users

router = APIRouter()

@router.post('/user', response_model=users.UserShow, status_code=status.HTTP_201_CREATED)
async def create_user(request: users.User, session: AsyncSession = Depends(get_session)):
    hash_password = hash_pass(request.password)
    user = await create_users(request.username, hash_password, session)
    return user