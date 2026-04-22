from fastapi import APIRouter
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))


@router.get("/reports")
def get_reports():
    try:
        result = (
            supabase.table("reports")
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
