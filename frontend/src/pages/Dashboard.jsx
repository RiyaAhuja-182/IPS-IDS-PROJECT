import {
  Activity,
  AlertTriangle,
  Ban,
  LayoutDashboard,
  Network,
  Radar,
  Server,
  Shield,
  Settings
} from "lucide-react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Dashboard() {

  const navigate = useNavigate();

  const [packets, setPackets] = useState([]);
  const [threats, setThreats] = useState([]);
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [time, setTime] = useState(new Date());
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [alertPopup, setAlertPopup] = useState({ visible: false, message: "" });
  const seenHighThreatsRef = useRef(new Set());

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        const [threatsResponse, blockedResponse, packetsResponse] = await Promise.all([
          axios.get("/api/threats"),
          axios.get("/api/blocked-ips"),
          axios.get("/api/packets"),
        ]);

        if (!isMounted) return;

        const sortedThreats = [...(threatsResponse.data || [])].sort(
          (a, b) => new Date(b.time || 0) - new Date(a.time || 0)
        );
        const sortedBlockedIps = [...(blockedResponse.data || [])].sort(
          (a, b) => new Date(b.blocked_at || 0) - new Date(a.blocked_at || 0)
        );
        const sortedPackets = [...(packetsResponse.data || [])].sort(
          (a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
        );
        const latestPackets = sortedPackets.slice(0, 20);

        const highThreats = sortedThreats.filter((threat) => threat.threat_level === "High");
        const newestUnseenHighThreat = highThreats.find((threat) => {
          const key = `${threat.source_ip}:${threat.attack_type}:${threat.time}`;
          return !seenHighThreatsRef.current.has(key);
        });

        highThreats.forEach((threat) => {
          const key = `${threat.source_ip}:${threat.attack_type}:${threat.time}`;
          seenHighThreatsRef.current.add(key);
        });

        if (newestUnseenHighThreat) {
          setAlertPopup({
            visible: true,
            message: `⚠ Port Scan from ${newestUnseenHighThreat.source_ip}`,
          });
        }

        setThreats(sortedThreats);
        setBlockedIPs(sortedBlockedIps);
        setPackets(latestPackets);
        setError("");
      } catch (fetchError) {
        if (!isMounted) return;
        setError("Unable to fetch IDS/IPS data from backend");
        console.error("Dashboard fetch error:", fetchError);
      }
    };

    fetchDashboardData();

    const dataRefreshInterval = setInterval(fetchDashboardData, 2000);

    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(dataRefreshInterval);
      clearInterval(clock);
    };

  }, []);

  useEffect(() => {
    if (!alertPopup.visible) {
      return undefined;
    }

    const popupTimer = setTimeout(() => {
      setAlertPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);

    return () => clearTimeout(popupTimer);
  }, [alertPopup.visible]);

  async function simulateAttack() {
    const simulatedIp = "198.51.100.200";
    setIsSimulatingAttack(true);

    try {
      const burstRequests = Array.from({ length: 30 }, (_, index) =>
        axios.post("http://localhost:5000/api/packet", {
          source_ip: simulatedIp,
          destination_ip: `10.0.0.${(index % 5) + 1}`,
          protocol: "TCP",
          size: 1200,
        })
      );

      await Promise.all(burstRequests);
    } catch (simulationError) {
      console.error("Attack simulation failed:", simulationError);
    } finally {
      setIsSimulatingAttack(false);
    }
  }

  const stats = [
    {
      title: "Total Packets Monitored",
      value: packets.length.toLocaleString(),
      subtitle: "Live API Monitoring",
      icon: Network,
      color: "text-cyan-400",
    },
    {
      title: "Detected Threats",
      value: threats.length.toLocaleString(),
      subtitle: `${threats.filter((threat) => threat.threat_level === "High").length} high-priority alerts`,
      icon: AlertTriangle,
      color: "text-amber-400",
    },
    {
      title: "Blocked IPs",
      value: blockedIPs.length.toLocaleString(),
      subtitle: "Auto-block active",
      icon: Ban,
      color: "text-rose-400",
    },
    {
      title: "System Status",
      value: "Secure",
      subtitle: "Detection engine operational",
      icon: Shield,
      color: "text-emerald-400",
    },
  ];

  const filteredPackets = packets.filter((packet) =>
    packet.source_ip?.toLowerCase().includes(search.toLowerCase())
  );
  const hasHighThreat = threats.some((threat) => threat.threat_level === "High");

  function threatColor(level) {
    if (level === "High") return "text-red-500";
    if (level === "Medium") return "text-yellow-400";
    return "text-green-400";
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">

      {alertPopup.visible && (
        <div className="fixed top-5 right-5 z-50 rounded-xl border border-amber-400/60 bg-amber-400/15 px-4 py-3 text-amber-200 shadow-2xl shadow-amber-900/30 animate-pulse">
          <p className="font-semibold">{alertPopup.message}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-[260px_1fr]">

        {/* Sidebar */}

        <aside className="border-r border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center gap-3 mb-8">
            <Radar className="text-cyan-400" />
            <h2 className="font-semibold text-lg">IPS-IDS Core</h2>
          </div>

          <nav className="space-y-2">

            <button className="flex w-full items-center gap-3 bg-cyan-500/10 border border-cyan-400 rounded-lg px-4 py-3">
              <LayoutDashboard className="h-4 w-4"/>
              Dashboard
            </button>

            <button onClick={() => navigate("/traffic")} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Activity className="h-4 w-4"/>
              Traffic Monitor
            </button>

            <button onClick={() => navigate("/threat")} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <AlertTriangle className="h-4 w-4"/>
              Threat Intelligence
            </button>

            <button onClick={() => navigate("/health")} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Server className="h-4 w-4"/>
              System Health
            </button>

            <button onClick={() => navigate("/blocked")} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Ban className="h-4 w-4"/>
              Blocked IPs
            </button>

            <button onClick={() => navigate("/alerts")} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <AlertTriangle className="h-4 w-4"/>
              Alerts
            </button>

            <button onClick={() => navigate("/settings")} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Settings className="h-4 w-4"/>
              Settings
            </button>

          </nav>

        </aside>

        {/* Main */}

        <main className="p-6 lg:p-8">

          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">

            <h1 className="text-3xl font-bold">
              IDS / IPS Security Dashboard
            </h1>

            <div className="flex items-center gap-3">
              <p className="text-slate-400">
                {time.toLocaleTimeString()}
              </p>

              <button
                onClick={simulateAttack}
                disabled={isSimulatingAttack}
                className="rounded-xl bg-rose-500 px-4 py-2 font-semibold text-white shadow-lg shadow-rose-900/40 transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSimulatingAttack ? "Simulating..." : "Simulate Attack"}
              </button>
            </div>

          </div>

          {hasHighThreat && (
            <div className="mb-4 rounded-xl border border-red-500 bg-red-500/20 px-4 py-3 text-center text-sm font-extrabold tracking-wide text-red-100 shadow-lg shadow-red-900/30 animate-pulse">
              🚨 CRITICAL ALERT: ACTIVE ATTACK DETECTED 🚨
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-lg border border-rose-500/50 bg-rose-500/10 p-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          {/* Stats */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg shadow-slate-950/30 hover:border-cyan-400 transition"
                >

                  <div className="flex justify-between items-center">

                    <div>
                      <p className="text-slate-400 text-sm">{item.title}</p>
                      <p className="text-2xl font-bold">{item.value}</p>
                    </div>

                    <Icon className={item.color}/>

                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    {item.subtitle}
                  </p>

                </div>
              );

            })}

          </section>

          {/* Search */}

          <div className="mt-8 mb-4">

            <input
              placeholder="Search Source IP..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg w-full"
            />

          </div>

          {/* Network Activity */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg shadow-slate-950/30">

            <h2 className="font-semibold mb-4">
              Packet Monitoring
            </h2>

            <div className="h-80 overflow-y-auto rounded-lg border border-slate-800/70">
              <table className="w-full text-sm">

                <thead className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur">
                  <tr className="text-left text-slate-400">
                    <th className="px-3 py-3">Source IP</th>
                    <th className="px-3 py-3">Destination IP</th>
                    <th className="px-3 py-3">Protocol</th>
                    <th className="px-3 py-3">Timestamp</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredPackets.map((row, index) => (

                    <tr
                      key={`${row.source_ip}-${row.timestamp}-${index}`}
                      className="border-t border-slate-800 transition-colors duration-300 hover:bg-slate-800"
                    >

                      <td className="px-3 py-2">{row.source_ip}</td>
                      <td className="px-3 py-2">{row.destination_ip}</td>
                      <td className="px-3 py-2">{row.protocol}</td>
                      <td className="px-3 py-2">{new Date(row.timestamp).toLocaleTimeString()}</td>

                    </tr>

                  ))}

                  {filteredPackets.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-3 py-4 text-slate-400">No packet data available</td>
                    </tr>
                  )}

                </tbody>

              </table>
            </div>

          </div>

          {/* Blocked IPs */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-6 shadow-lg shadow-slate-950/30">

            <h2 className="font-semibold mb-4">
              Blocked IPs
            </h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400">
                  <th className="pb-2">IP</th>
                  <th className="pb-2">Reason</th>
                  <th className="pb-2">Blocked At</th>
                </tr>
              </thead>
              <tbody>
                {blockedIPs.map((entry, index) => (
                  <tr key={`${entry.ip}-${entry.blocked_at}-${index}`} className="border-t border-slate-800">
                    <td className="py-2">{entry.ip}</td>
                    <td>{entry.reason}</td>
                    <td>{new Date(entry.blocked_at).toLocaleTimeString()}</td>
                  </tr>
                ))}
                {blockedIPs.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-4 text-slate-400">No blocked IPs</td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>

          {/* Threats */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-6 shadow-lg shadow-slate-950/30">

            <h2 className="font-semibold mb-4">
              Detected Threats
            </h2>

            <table className="w-full text-sm">

              <thead>
                <tr className="text-left text-slate-400">
                  <th className="pb-2">Attack Type</th>
                  <th className="pb-2">Source IP</th>
                  <th className="pb-2">Threat Level</th>
                  <th className="pb-2">Time</th>
                </tr>
              </thead>

              <tbody>

                {threats.map((row, index)=>(
                  <tr
                    key={`${row.source_ip}-${row.time}-${index}`}
                    className={`border-t border-slate-800 transition ${row.threat_level === "High" ? "bg-red-500/15" : "hover:bg-slate-800/70"}`}
                  >

                    <td className="py-2">{row.attack_type}</td>
                    <td>{row.source_ip}</td>
                    <td className={threatColor(row.threat_level)}>
                      {row.threat_level}
                    </td>
                    <td>{new Date(row.time).toLocaleTimeString()}</td>

                  </tr>
                ))}

                {threats.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 text-slate-400">No threats detected</td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
}