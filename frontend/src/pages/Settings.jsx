import { Settings as SettingsIcon, Bell, Shield, Network } from "lucide-react";
import { useState } from "react";

function Settings() {

  const [alerts, setAlerts] = useState(true);
  const [autoBlock, setAutoBlock] = useState(true);
  const [monitoring, setMonitoring] = useState("Active");
  const [securityLevel, setSecurityLevel] = useState("High");

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="text-cyan-400" />
        <h1 className="text-3xl font-bold">System Settings</h1>
      </div>

      <div className="space-y-6 max-w-2xl">

        <div className="flex justify-between items-center bg-slate-900 p-5 rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="text-yellow-400" />
            <p>Alert Notifications</p>
          </div>

          <button
            onClick={() => setAlerts(!alerts)}
            className="bg-cyan-500 px-4 py-1 rounded"
          >
            {alerts ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="flex justify-between items-center bg-slate-900 p-5 rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="text-red-400" />
            <p>Auto IP Blocking</p>
          </div>

          <button
            onClick={() => setAutoBlock(!autoBlock)}
            className="bg-cyan-500 px-4 py-1 rounded"
          >
            {autoBlock ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="flex justify-between items-center bg-slate-900 p-5 rounded-lg">
          <div className="flex items-center gap-3">
            <Network className="text-green-400" />
            <p>Monitoring Mode</p>
          </div>

          <select
            value={monitoring}
            onChange={(e) => setMonitoring(e.target.value)}
            className="bg-slate-800 p-1 rounded"
          >
            <option>Active</option>
            <option>Passive</option>
            <option>Disabled</option>
          </select>
        </div>

        <div className="flex justify-between items-center bg-slate-900 p-5 rounded-lg">
          <p>Security Level</p>

          <select
            value={securityLevel}
            onChange={(e) => setSecurityLevel(e.target.value)}
            className="bg-slate-800 p-1 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

      </div>

    </div>
  );
}

export default Settings;