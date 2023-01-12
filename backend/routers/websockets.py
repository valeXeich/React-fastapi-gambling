from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from starlette.websockets import WebSocketState
from service.messages import create_message
from service.users import get_user
from service.roulette import check_seeds, save_result, get_round
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
            await create_message(user.id, message['message'], session)
            print(message)
            await message_manager.broadcast(json.dumps(message))
        except WebSocketDisconnect:
            message_manager.disconnect(websocket)


@router.websocket('/roll')
async def websocket_endpoint(websocket: WebSocket, session: AsyncSession = Depends(get_session)):
    tasks = []
    last_round = await get_round(session)
    round_ = last_round if last_round else 0
    
    async def send_result():
        nonlocal round_
        while websocket.client_state == WebSocketState.CONNECTED:
                await asyncio.sleep(25)
                round_ += 1
                result = await roulette_manager.get_result(round_, session)
                await save_result(round_, result, session)
                print(result)
                print(round_)
                await roulette_manager.broadcast(json.dumps({'result': result}))
                
    async def disc():
        while True:
            try:
                await websocket.receive_text()
            except WebSocketDisconnect:
                roulette_manager.disconnect(websocket)

    send_task = asyncio.create_task(send_result())
    disc_task = asyncio.create_task(disc())
    tasks.append(send_task)
    tasks.append(disc_task)

    await roulette_manager.connect(websocket)
    
    await asyncio.gather(*tasks)


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