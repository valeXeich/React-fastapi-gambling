from fastapi import WebSocket
from typing import List
import secrets
import random
from hashlib import sha256

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
    def __init__(self):
        super().__init__()
        self.server_seed_bytes = secrets.token_bytes(4)
        self.server_seed = sha256(self.server_seed_bytes).hexdigest()
        self.public_seed = ''.join([str(random.randint(1, 39)) for _ in range(5)])
    
    def get_result(self, round_):
        hash_ = sha256(f'{self.server_seed}-{self.public_seed}-{round_}'.encode('utf-8')).hexdigest()
        result = int(hash_[0:0 + 8], 16) % 15
        return result