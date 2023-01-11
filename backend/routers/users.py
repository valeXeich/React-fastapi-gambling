from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from schemas import users, token
from auth.password_hash import hash_pass
from auth.oauth2 import get_current_user
from service.users import create_users, get_user
from service.transactions import get_balance, change_balance, deposit, withdraw

router = APIRouter()

@router.post('/user', response_model=users.UserShow, status_code=status.HTTP_201_CREATED)
async def create_user(request: users.User, session: AsyncSession = Depends(get_session)):
    user = await get_user(request.username, session)
    if user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, 'This user is busy')
    if len(request.password) < 8:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, 'Password must be at least 8 characters')
    hash_password = hash_pass(request.password)
    user = await create_users(request.username, hash_password, session)
    return user


@router.get('/user/balance', response_model=users.UserBalance)
async def get_user_balance(current_user: token.TokenData = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    balance = await get_balance(current_user.username, session)
    return balance


@router.post('/user/change-balance')
async def change_user_balance(request: users.UserBalance, current_user: token.TokenData = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    await change_balance(request.balance, current_user.username, session)
    return {'ok': 'ok'}


@router.post('/user/deposit', status_code=status.HTTP_201_CREATED)
async def deposit_user(request: users.UserBalance, current_user: token.TokenData = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    if request.balance <= 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, 'Value must be greater than zero')
    await deposit(request.balance, current_user.username, session)
    return {'ok': 'ok'}


@router.post('/user/withdraw', status_code=status.HTTP_201_CREATED)
async def withdraw_user(request: users.UserBalance, current_user: token.TokenData = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    balance = await get_balance(current_user.username, session)
    if request.balance <= 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, 'Value must be greater than zero')
    if request.balance > balance['balance']:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, 'The value must not exceed your balance')
    await withdraw(request.balance, current_user.username, session)
    return {'ok': 'ok'}


@router.get('/user', response_model=token.TokenData, status_code=status.HTTP_200_OK)
async def get_current_active_user(current_user: token.TokenData = Depends(get_current_user)):
    return current_user


