const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

const PACKET_WINDOW_MS = 30 * 1000;
const PORT_SCAN_THRESHOLD = 20;
const SUSPICIOUS_PACKET_SIZE_THRESHOLD = 1000;

let packets = [];
let threats = [];
let blockedIPs = [];
let users = [];
const ipRequests = {};
const detectedThreatKeys = new Set();

app.use(cors());
app.use(express.json());

function nowIso() {
  return new Date().toISOString();
}

function trackIpActivity(sourceIp) {
  const now = Date.now();
  const history = ipRequests[sourceIp] || [];
  const recent = history.filter((timestamp) => now - timestamp <= PACKET_WINDOW_MS);

  recent.push(now);
  ipRequests[sourceIp] = recent;

  return recent.length;
}

function addThreat(attackType, sourceIp, threatLevel) {
  const threatKey = `${sourceIp}:${attackType}`;
  if (detectedThreatKeys.has(threatKey)) {
    return null;
  }

  detectedThreatKeys.add(threatKey);

  const threat = {
    attack_type: attackType,
    category: attackType === "Port Scan" ? "Reconnaissance" : "Anomaly",
    source_ip: sourceIp,
    threat_level: threatLevel,
    time: nowIso(),
  };

  // Persist threat globally so GET /api/threats always reflects detections.
  threats.push(threat);
  console.log("[THREAT DETECTED]", threat);
  console.log("Threats:", threats);
  return threat;
}

function blockIp(ip, reason) {
  const existing = blockedIPs.find((entry) => entry.ip === ip);

  if (existing) {
    console.log("[IP BLOCKED] Already blocked:", existing);
    return existing;
  }

  const blocked = {
    ip,
    reason,
    blocked_at: nowIso(),
  };

  blockedIPs.push(blocked);
  console.log("[IP BLOCKED]", blocked);
  return blocked;
}

function detectThreats(packet, packetCountForIp) {
  const detectedThreats = [];

  if (packetCountForIp > PORT_SCAN_THRESHOLD) {
    const threat = addThreat("Port Scan", packet.source_ip, "High");
    if (threat) {
      blockIp(packet.source_ip, "Port Scan detected: high packet frequency");
      detectedThreats.push(threat);
    }
  }

  if (typeof packet.size === "number" && packet.size > SUSPICIOUS_PACKET_SIZE_THRESHOLD) {
    const threat = addThreat("Suspicious", packet.source_ip, "Medium");
    if (threat) {
      blockIp(packet.source_ip, `Suspicious packet size: ${packet.size}`);
      detectedThreats.push(threat);
    }
  }

  return detectedThreats;
}

app.get("/api/packets", (req, res) => {
  res.json(packets);
});

app.get("/api/threats", (req, res) => {
  console.log("Threats:", threats);
  res.json(threats);
});

app.get("/api/blocked-ips", (req, res) => {
  res.json(blockedIPs);
});

app.post("/api/register", (req, res) => {
  const username = String(req.body?.username || "").trim().toLowerCase();
  const password = String(req.body?.password || "").trim();

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const existing = users.find((user) => user.username === username);
  if (existing) {
    return res.status(409).json({ error: "Username already exists" });
  }

  users.push({ username, password, created_at: nowIso() });
  return res.status(201).json({ message: "Account created", username });
});

app.post("/api/login", (req, res) => {
  const username = String(req.body?.username || "").trim().toLowerCase();
  const password = String(req.body?.password || "").trim();

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const user = users.find((entry) => entry.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  return res.json({ message: "Login successful", username: user.username });
});

app.post("/api/packet", (req, res) => {
  const { source_ip, destination_ip, protocol, size } = req.body;

  if (!source_ip || !destination_ip || !protocol) {
    return res.status(400).json({
      error: "source_ip, destination_ip, and protocol are required",
    });
  }

  const packet = {
    source_ip,
    destination_ip,
    protocol,
    timestamp: nowIso(),
    ...(typeof size === "number" ? { size } : {}),
  };

  packets.push(packet);
  console.log("[NEW PACKET]", packet);

  const requestCountForIp = trackIpActivity(source_ip);
  const detectedThreats = detectThreats(packet, requestCountForIp);

  return res.status(201).json({
    message: "Packet processed",
    packet,
    threats_detected: detectedThreats,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "IDS/IPS backend running",
    port: PORT,
  });
});

app.listen(PORT, () => {
  console.log(`IDS/IPS backend running on http://localhost:${PORT}`);
});