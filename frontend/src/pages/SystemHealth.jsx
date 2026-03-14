import { Cpu, HardDrive, Wifi, ShieldCheck, Server } from "lucide-react";

const healthStats = [
  {
    title: "CPU Usage",
    value: 32,
    status: "Normal",
    icon: Cpu,
    color: "bg-cyan-500",
  },
  {
    title: "Memory Usage",
    value: 58,
    status: "Stable",
    icon: HardDrive,
    color: "bg-purple-500",
  },
  {
    title: "Network Status",
    value: 90,
    status: "Active",
    icon: Wifi,
    color: "bg-green-500",
  },
  {
    title: "Security Engine",
    value: 100,
    status: "Running",
    icon: ShieldCheck,
    color: "bg-emerald-500",
  },
];

export default function SystemHealth() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">

      {/* Page Title */}

      <h1 className="text-3xl font-bold mb-2">
        System Health Monitor
      </h1>

      <p className="text-slate-400 mb-10">
        Real-time monitoring of IDS / IPS system resources and services
      </p>

      {/* Health Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {healthStats.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-400 transition"
            >

              <div className="flex justify-between items-center mb-4">

                <p className="text-sm text-slate-400">
                  {item.title}
                </p>

                <Icon className="h-6 w-6 text-cyan-400" />

              </div>

              <p className="text-3xl font-bold mb-3">
                {item.value}%
              </p>

              {/* Progress Bar */}

              <div className="w-full bg-slate-800 rounded-full h-2 mb-2">

                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${item.value}%` }}
                ></div>

              </div>

              <p className="text-xs text-slate-400">
                {item.status}
              </p>

            </div>
          );

        })}

      </div>

      {/* Server Information */}

      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex items-center gap-3 mb-6">

          <Server className="text-cyan-400" />

          <h2 className="text-lg font-semibold">
            Server Information
          </h2>

        </div>

        <table className="w-full text-sm">

          <tbody className="text-slate-300">

            <tr className="border-t border-slate-800">
              <td className="py-4">Server Uptime</td>
              <td className="text-green-400 font-medium">
                3 Days 12 Hours
              </td>
            </tr>

            <tr className="border-t border-slate-800">
              <td className="py-4">Active Connections</td>
              <td className="text-cyan-400 font-medium">
                124
              </td>
            </tr>

            <tr className="border-t border-slate-800">
              <td className="py-4">Firewall Status</td>
              <td className="text-emerald-400 font-medium">
                Active
              </td>
            </tr>

            <tr className="border-t border-slate-800">
              <td className="py-4">Database Status</td>
              <td className="text-emerald-400 font-medium">
                Connected
              </td>
            </tr>

            <tr className="border-t border-slate-800">
              <td className="py-4">IDS Engine</td>
              <td className="text-green-400 font-medium">
                Running
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}