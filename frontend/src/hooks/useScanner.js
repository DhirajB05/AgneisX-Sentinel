import { useState, useRef } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useScanner() {
  const [result, setResult]             = useState(null);
  const [loading, setLoading]           = useState(false);
  const [loadingStage, setLoadingStage] = useState("idle");
  const [error, setError]               = useState(null);
  const l2TimerRef                      = useRef(null);

  const scan = async (text) => {
    if (!text?.trim()) {
      setError("INPUT REQUIRED");
      return;
    }

    setError(null);
    setResult(null);
    setLoading(true);
    setLoadingStage("l1");

    l2TimerRef.current = setTimeout(() => setLoadingStage("l2"), 1000);

    try {
      const res = await axios.post(
        `${API}/scan`,
        { text },
        { timeout: 15000 }
      );
      clearTimeout(l2TimerRef.current);
      l2TimerRef.current = null;
      setResult(res.data);
      setLoadingStage("complete");
    } catch (err) {
      clearTimeout(l2TimerRef.current);
      l2TimerRef.current = null;
      setError(
        err.code === "ECONNABORTED"
          ? "CONNECTION TIMEOUT — RETRY"
          : "BACKEND ERROR — CHECK LOGS"
      );
      setLoadingStage("idle");
    } finally {
      setLoading(false);
      setTimeout(() => setLoadingStage("idle"), 2500);
    }
  };

  return { scan, result, loading, loadingStage, error };
}
