from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from auth.password_hash import verify
from auth.token import create_access_token
from database import get_session
from service.users import get_user

router = APIRouter()

@router.post('/login')
async def login(request: OAuth2PasswordRequestForm = Depends(), session: AsyncSession = Depends(get_session)):
    user = await get_user(request.username, session)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='Not found')
    if not verify(user.password, request.password):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail='invalid password')
    access_token = create_access_token(
        data={'sub': user.username}
    )
    return {'access_token': access_token, 'token_type': 'bearer'}
    