import React, { useEffect, useState } from "react";

function TrafficMonitor() {
  const [traffic, setTraffic] = useState([]);
  const [packetCount, setPacketCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const suspicious = Math.random() > 0.8;

      const newTraffic = {
        time: new Date().toLocaleTimeString(),
        sourceIP: "192.168.1." + Math.floor(Math.random() * 255),
        destination: "Server",
        status: suspicious ? "Suspicious" : "Normal",
      };

      setTraffic((prev) => [newTraffic, ...prev.slice(0, 9)]);
      setPacketCount((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
        Network Traffic Monitor
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Real-time monitoring of incoming network packets
      </p>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
          }}
        >
          <h3>Total Packets</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>
            {packetCount}
          </p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
          }}
        >
          <h3>Monitoring Status</h3>
          <p style={{ fontSize: "18px", color: "#38bdf8" }}>
            Live Monitoring Active
          </p>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#0f172a",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Time</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Source IP</th>
              <th style={{ padding: "10px", textAlign: "left" }}>
                Destination
              </th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {traffic.map((t, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #1e293b",
                }}
              >
                <td style={{ padding: "10px" }}>{t.time}</td>
                <td style={{ padding: "10px" }}>{t.sourceIP}</td>
                <td style={{ padding: "10px" }}>{t.destination}</td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      color: "white",
                      background:
                        t.status === "Suspicious" ? "#ef4444" : "#22c55e",
                    }}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrafficMonitor;