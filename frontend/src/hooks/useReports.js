import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

let supabase = null;
const getSupabase = () => {
  if (!supabase) {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_KEY;
    if (!url || !key) return null;
    supabase = createClient(url, key);
  }
  return supabase;
};

export function useReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    const client = getSupabase();
    if (!client) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await client
        .from("reports")
        .select(
          "id, created_at, verdict, injection_score, attack_type, severity, input_preview"
        )
        .order("created_at", { ascending: false })
        .limit(10);
      if (!error && data) setReports(data);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports();
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  return { reports, loading, refetch: fetchReports };
}
