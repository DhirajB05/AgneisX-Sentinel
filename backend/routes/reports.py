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


@router.get("/reports")
def get_reports():
    try:
        client = get_supabase()
        if not client:
            return {"reports": [], "total": 0}
        result = (
            client.table("reports")
            .select(
                "id, created_at, verdict, injection_score, "
                "attack_type, severity, input_preview, layer2_triggered"
            )
            .order("created_at", desc=True)
            .limit(10)
            .execute()
        )
        return {"reports": result.data, "total": len(result.data)}
    except Exception:
        return {"reports": [], "total": 0}
