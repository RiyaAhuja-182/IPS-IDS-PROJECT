import React, { useState } from "react";

function ThreatIntelligence() {
  const [threats] = useState([
    {
      type: "SQL Injection",
      source: "185.45.22.91",
      severity: "High",
      action: "Blocked",
      time: "10:45:23",
    },
    {
      type: "DDoS Attempt",
      source: "103.78.114.12",
      severity: "Medium",
      action: "Monitoring",
      time: "10:41:09",
    },
    {
      type: "Malware Signature",
      source: "91.210.55.17",
      severity: "High",
      action: "Quarantined",
      time: "10:37:16",
    },
    {
      type: "Port Scanning",
      source: "45.67.88.204",
      severity: "Low",
      action: "Allowed",
      time: "10:29:48",
    },
    {
      type: "Brute Force Attack",
      source: "151.80.33.19",
      severity: "Medium",
      action: "Blocked",
      time: "10:22:03",
    },
  ]);

  const getColor = (level) => {
    if (level === "High") return "#ef4444";
    if (level === "Medium") return "#f59e0b";
    return "#22c55e";
  };

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
        Threat Intelligence Center
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Real-time analysis of detected cyber threats and attack patterns
      </p>

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
              <th style={{ padding: "10px", textAlign: "left" }}>Attack Type</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Source IP</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Severity</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Time</th>
            </tr>
          </thead>

          <tbody>
            {threats.map((t, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #1e293b",
                }}
              >
                <td style={{ padding: "10px" }}>{t.type}</td>
                <td style={{ padding: "10px" }}>{t.source}</td>

                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      background: getColor(t.severity),
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {t.severity}
                  </span>
                </td>

                <td style={{ padding: "10px" }}>{t.action}</td>
                <td style={{ padding: "10px" }}>{t.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ThreatIntelligence;