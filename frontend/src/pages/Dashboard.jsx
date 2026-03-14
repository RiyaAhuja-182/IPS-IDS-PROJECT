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

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {

  const navigate = useNavigate();

  const [packets, setPackets] = useState(2487921);
  const [time, setTime] = useState(new Date());
  const [search, setSearch] = useState("");

  useEffect(() => {

    const packetInterval = setInterval(() => {
      setPackets((prev) => prev + Math.floor(Math.random() * 50));
    }, 2000);

    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(packetInterval);
      clearInterval(clock);
    };

  }, []);

  const stats = [
    {
      title: "Total Packets Monitored",
      value: packets.toLocaleString(),
      subtitle: "Live Monitoring",
      icon: Network,
      color: "text-cyan-400",
    },
    {
      title: "Detected Threats",
      value: "147",
      subtitle: "12 high-priority alerts",
      icon: AlertTriangle,
      color: "text-amber-400",
    },
    {
      title: "Blocked IPs",
      value: "53",
      subtitle: "Auto-block enabled",
      icon: Ban,
      color: "text-rose-400",
    },
    {
      title: "System Status",
      value: "Secure",
      subtitle: "All modules operational",
      icon: Shield,
      color: "text-emerald-400",
    },
  ];

  const networkActivity = [
    { sourceIp: "192.168.1.28", destinationIp: "10.0.0.44", protocol: "TCP", status: "Allowed" },
    { sourceIp: "172.16.0.7", destinationIp: "10.0.0.90", protocol: "UDP", status: "Blocked" },
    { sourceIp: "203.0.113.42", destinationIp: "10.0.0.17", protocol: "HTTPS", status: "Monitored" },
    { sourceIp: "198.51.100.31", destinationIp: "10.0.0.120", protocol: "ICMP", status: "Blocked" },
    { sourceIp: "10.10.14.3", destinationIp: "10.0.0.201", protocol: "SSH", status: "Allowed" },
  ];

  const threats = [
    { attackType: "SQL Injection", sourceIp: "185.45.22.91", threatLevel: "High", time: "10:45:23" },
    { attackType: "DDoS Probe", sourceIp: "103.78.114.12", threatLevel: "Medium", time: "10:41:09" },
    { attackType: "Malware Match", sourceIp: "91.210.55.17", threatLevel: "High", time: "10:37:16" },
    { attackType: "Port Scanning", sourceIp: "45.67.88.204", threatLevel: "Low", time: "10:29:48" },
  ];

  const filteredTraffic = networkActivity.filter((item) =>
    item.sourceIp.includes(search)
  );

  function threatColor(level) {
    if (level === "High") return "text-red-400";
    if (level === "Medium") return "text-yellow-400";
    return "text-green-400";
  }

  return (

    <div className="min-h-screen bg-slate-950 text-slate-100">

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

        <main className="p-6">

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
              IDS / IPS Security Dashboard
            </h1>

            <p className="text-slate-400">
              {time.toLocaleTimeString()}
            </p>

          </div>

          {/* Stats */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-cyan-400 transition"
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

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

            <h2 className="font-semibold mb-4">
              Recent Network Activity
            </h2>

            <table className="w-full text-sm">

              <tbody>

                {filteredTraffic.map((row) => (

                  <tr key={row.sourceIp} className="border-t border-slate-800 hover:bg-slate-800">

                    <td className="py-2">{row.sourceIp}</td>
                    <td>{row.destinationIp}</td>
                    <td>{row.protocol}</td>
                    <td>{row.status}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Threats */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-6">

            <h2 className="font-semibold mb-4">
              Detected Threats
            </h2>

            <table className="w-full text-sm">

              <tbody>

                {threats.map((row)=>(
                  <tr key={row.sourceIp} className="border-t border-slate-800">

                    <td className="py-2">{row.attackType}</td>
                    <td>{row.sourceIp}</td>
                    <td className={threatColor(row.threatLevel)}>
                      {row.threatLevel}
                    </td>
                    <td>{row.time}</td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
}