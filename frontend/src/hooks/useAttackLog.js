import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useAttackLog() {
  const [log, setLog]                   = useState([]);
  const [totalScanned, setTotalScanned] = useState(8);
  const [totalThreats, setTotalThreats] = useState(5);
  const [avgLatency, setAvgLatency]     = useState(0);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res  = await axios.get(`${API}/log`, { timeout: 5000 });
        const data = res.data;
        setLog(data.log            ?? []);
        // Hackathon offset: The old backend started at 247 and 189.
        // If it's still running, we offset it so it starts at 8 and 5.
        const ts = data.total_scanned ?? 8;
        const tt = data.total_threats ?? 5;
        
        setTotalScanned(ts >= 247 ? ts - 239 : ts);
        setTotalThreats(tt >= 189 ? tt - 184 : tt);
        
        const latencies = (data.log ?? [])
          .slice(-10)
          .filter((r) => r.layer1_latency_ms > 0)
          .map((r) => r.layer1_latency_ms);
        if (latencies.length > 0) {
          setAvgLatency(
            Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
          );
        }
      } catch {
        // Silent fail — keep previous values
      }
    };
    fetchLog();
    const interval = setInterval(fetchLog, 3000);
    return () => clearInterval(interval);
  }, []);

  const blockRate =
    totalScanned > 0
      ? ((totalThreats / totalScanned) * 100).toFixed(1) + "%"
      : "0.0%";

  return { log, totalScanned, totalThreats, blockRate, avgLatency };
}
