import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export function useAttackLog() {
  const [log, setLog]                   = useState([]);
  const [totalScanned, setTotalScanned] = useState(247);
  const [totalThreats, setTotalThreats] = useState(189);
  const [avgLatency, setAvgLatency]     = useState(0);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res  = await axios.get(`${API}/log`, { timeout: 5000 });
        const data = res.data;
        setLog(data.log            ?? []);
        setTotalScanned(data.total_scanned ?? 247);
        setTotalThreats(data.total_threats  ?? 189);
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
