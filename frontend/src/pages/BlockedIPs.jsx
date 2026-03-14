import { Ban } from "lucide-react";

const blockedIPs = [
  {
    ip: "185.45.22.91",
    location: "Russia",
    threat: "SQL Injection",
    blockType: "Automatic",
    status: "Blocked",
    time: "10:45:23",
  },
  {
    ip: "103.78.114.12",
    location: "China",
    threat: "DDoS Attempt",
    blockType: "Automatic",
    status: "Blocked",
    time: "10:41:09",
  },
  {
    ip: "91.210.55.17",
    location: "Germany",
    threat: "Malware Activity",
    blockType: "Manual",
    status: "Blocked",
    time: "10:37:16",
  },
  {
    ip: "45.67.88.204",
    location: "Brazil",
    threat: "Port Scanning",
    blockType: "Automatic",
    status: "Blocked",
    time: "10:29:48",
  },
];

export default function BlockedIPs() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">

      <h1 className="text-3xl font-bold mb-3">
        Blocked IP Addresses
      </h1>

      <p className="text-slate-400 mb-8">
        IPs blocked by the Intrusion Prevention System
      </p>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <table className="w-full text-sm">

          <thead className="text-slate-400 border-b border-slate-800">

            <tr>
              <th className="py-3 text-left">IP Address</th>
              <th className="text-left">Location</th>
              <th className="text-left">Threat Type</th>
              <th className="text-left">Block Type</th>
              <th className="text-left">Status</th>
              <th className="text-left">Time</th>
            </tr>

          </thead>

          <tbody>

            {blockedIPs.map((row) => (

              <tr key={row.ip} className="border-t border-slate-800">

                <td className="py-3 text-red-400 font-medium">
                  {row.ip}
                </td>

                <td>{row.location}</td>

                <td>{row.threat}</td>

                <td>
                  <span className="px-2 py-1 text-xs rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                    {row.blockType}
                  </span>
                </td>

                <td>
                  <span className="px-2 py-1 text-xs rounded border border-red-500/40 bg-red-500/10 text-red-300">
                    {row.status}
                  </span>
                </td>

                <td>{row.time}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}