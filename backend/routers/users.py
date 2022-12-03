from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from schemas import users, token
from auth.password_hash import hash_pass
from auth.oauth2 import get_current_user
from service.users import create_users

router = APIRouter()

@router.post('/user', response_model=users.UserShow, status_code=status.HTTP_201_CREATED)
async def create_user(request: users.User, session: AsyncSession = Depends(get_session)):
    hash_password = hash_pass(request.password)
    user = await create_users(request.username, hash_password, session)
    return user

@router.get('/user', response_model=token.TokenData, status_code=status.HTTP_200_OK)
async def get_current_active_user(current_user: token.TokenData = Depends(get_current_user)):
    # if current_user.disabled:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    return current_user