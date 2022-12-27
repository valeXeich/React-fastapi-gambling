from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from starlette.websockets import WebSocketState
from service.messages import create_message
from service.users import get_user
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_session
from datetime import datetime
from service.websockets import RouletteConnectionManager, BaseConnectionManager
import asyncio
import json

router = APIRouter()

message_manager = BaseConnectionManager()
roulette_manager = RouletteConnectionManager()
bet_manager = BaseConnectionManager()


@router.websocket('/message')
async def websocket_endpoint_chat(websocket: WebSocket, session: AsyncSession = Depends(get_session)):
    await message_manager.connect(websocket)
    while True:
        try:
            time = datetime.now().strftime('%H:%M')
            message = await websocket.receive_text()
            message = json.loads(message)
            message['time'] = time
            user = await get_user(message['username'], session)
            await create_message(user.id, message['text'], session)
            print(message)
            await message_manager.broadcast(json.dumps(message))
        except WebSocketDisconnect:
            message_manager.disconnect(websocket)


@router.websocket('/roll')
async def websocket_endpoint(websocket: WebSocket):
    round_ = 1
    
    async def send_result():
        nonlocal round_
        while websocket.client_state == WebSocketState.CONNECTED:
            await asyncio.sleep(24)
            round_ += 1
            result = roulette_manager.get_result(round_)
            print(result)
            print(round_)
            await roulette_manager.broadcast(json.dumps({'result': result}))

    async def disc():
        while True:
            try:
                await websocket.receive_text()
            except WebSocketDisconnect:
                roulette_manager.disconnect(websocket)

    await roulette_manager.connect(websocket)
    
    await asyncio.gather(disc(), send_result())


@router.websocket('/bet')
async def websocket_bet(websocket: WebSocket):
    await bet_manager.connect(websocket)
    while True:
        try:
            message = await websocket.receive_text()
            await bet_manager.broadcast(message)
            print(message)
        except WebSocketDisconnect:
            bet_manager.disconnect(websocket)