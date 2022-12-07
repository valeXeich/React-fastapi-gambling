from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routers import users, auth
from typing import List
import json

import secrets
import random
from hashlib import sha256

app = FastAPI()

app.include_router(users.router, tags=['user'])
app.include_router(auth.router, tags=['auth'])

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
   CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)



class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()


@app.websocket('/message/{client_id}')
async def websocket_endpoint_chat(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    while True:
        try:
            data = await websocket.receive_text()
            message = {'id': 1, 'username': 'valex', 'text': data}
            print(message)
            await manager.broadcast(json.dumps(message))
        except WebSocketDisconnect:
            manager.disconnect(websocket)
            await manager.broadcast(json.dumps({'client_id': client_id}))


# @app.websocket('/roll')
# async def websocket_endpoint(websocket: WebSocket, client_id: int):
#     server_seed_bytes = secrets.token_bytes(4)
#     server_seed = sha256(server_seed_bytes).hexdigest()
#     public_seed = ''.join([str(random.randint(1, 39)) for _ in range(5)])
#     round_ = 1
#     hash_ = sha256(f'{server_seed}-{public_seed}-{round_}'.encode('utf-8')).hexdigest()
#     await manager.connect(websocket)
#     while True:
#         try:
#             round_ += 1
#             result = int(hash_[0:0 + 8], 16) % 15
#             data = await websocket.receive_text()
#             print(result)
#             print(data)
#             await websocket.send_json({'result': result})
#         except WebSocketDisconnect:
#             manager.disconnect(websocket)
#             await manager.broadcast(f"Client #{client_id} left the chat")