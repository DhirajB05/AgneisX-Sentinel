from fastapi import APIRouter
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
def get_supabase():
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        return None
    try:
        return create_client(url, key)
    except Exception:
        return None

@router.get("/health")
def health_check():
    db_status = "connected"
    client = get_supabase()
    if not client:
        db_status = "error"
    else:
        try:
            client.table("reports").select("id").limit(1).execute()
        except Exception:
            db_status = "error"
            
    return {
        "status":   "ok",
        "layer1":   "online",
        "layer2":   "standby",
        "database": db_status,
    }
