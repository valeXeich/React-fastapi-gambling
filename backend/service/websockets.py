from fastapi import WebSocket
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import secrets
import random
from hashlib import sha256
from service.roulette import check_seeds

class BaseConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(self.active_connections)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


class RouletteConnectionManager(BaseConnectionManager):
    
    async def get_result(self, round_, session: AsyncSession):
        seed = await check_seeds(session)
        hash_ = sha256(f'{seed.server_seed}-{seed.public_seed}-{round_}'.encode('utf-8')).hexdigest()
        result = int(hash_[0:0 + 8], 16) % 15
        return result