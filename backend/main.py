from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import scan, reports, health

app = FastAPI(title="SENTINEL API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan.router)
app.include_router(reports.router)
app.include_router(health.router)
