from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from schemas import users, token
from auth.password_hash import hash_pass
from auth.oauth2 import get_current_user
from service.users import create_users, get_user
from service.transactions import get_balance

router = APIRouter()

@router.post('/user', response_model=users.UserShow, status_code=status.HTTP_201_CREATED)
async def create_user(request: users.User, session: AsyncSession = Depends(get_session)):
    user = await get_user(request.username, session)
    if user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, 'This user is busy')
    hash_password = hash_pass(request.password)
    user = await create_users(request.username, hash_password, session)
    return user


@router.get('/user/balance', response_model=users.UserBalance)
async def get_user_balance(current_user: token.TokenData = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    balance = await get_balance(current_user.username, session)
    return balance


@router.get('/user', response_model=token.TokenData, status_code=status.HTTP_200_OK)
async def get_current_active_user(current_user: token.TokenData = Depends(get_current_user)):
    return current_user

