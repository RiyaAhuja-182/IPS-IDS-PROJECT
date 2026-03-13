import {
	Activity,
	AlertTriangle,
	Ban,
	LayoutDashboard,
	Network,
	Radar,
	Server,
	Shield,
} from 'lucide-react'

const stats = [
	{
		title: 'Total Packets Monitored',
		value: '2,487,921',
		subtitle: '+4.8% from last hour',
		icon: Network,
		color: 'text-cyan-400',
		chip: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300',
	},
	{
		title: 'Detected Threats',
		value: '147',
		subtitle: '12 high-priority alerts',
		icon: AlertTriangle,
		color: 'text-amber-400',
		chip: 'border-amber-400/40 bg-amber-500/10 text-amber-300',
	},
	{
		title: 'Blocked IPs',
		value: '53',
		subtitle: 'Auto-block enabled',
		icon: Ban,
		color: 'text-rose-400',
		chip: 'border-rose-400/40 bg-rose-500/10 text-rose-300',
	},
	{
		title: 'System Status',
		value: 'Secure',
		subtitle: 'All modules operational',
		icon: Shield,
		color: 'text-emerald-400',
		chip: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
	},
]

const networkActivity = [
	{
		sourceIp: '192.168.1.28',
		destinationIp: '10.0.0.44',
		protocol: 'TCP',
		status: 'Allowed',
	},
	{
		sourceIp: '172.16.0.7',
		destinationIp: '10.0.0.90',
		protocol: 'UDP',
		status: 'Blocked',
	},
	{
		sourceIp: '203.0.113.42',
		destinationIp: '10.0.0.17',
		protocol: 'HTTPS',
		status: 'Monitored',
	},
	{
		sourceIp: '198.51.100.31',
		destinationIp: '10.0.0.120',
		protocol: 'ICMP',
		status: 'Blocked',
	},
	{
		sourceIp: '10.10.14.3',
		destinationIp: '10.0.0.201',
		protocol: 'SSH',
		status: 'Allowed',
	},
]

const threats = [
	{
		attackType: 'SQL Injection',
		sourceIp: '185.45.22.91',
		threatLevel: 'High',
		time: '10:45:23',
	},
	{
		attackType: 'DDoS Probe',
		sourceIp: '103.78.114.12',
		threatLevel: 'Medium',
		time: '10:41:09',
	},
	{
		attackType: 'Malware Signature Match',
		sourceIp: '91.210.55.17',
		threatLevel: 'High',
		time: '10:37:16',
	},
	{
		attackType: 'Port Scanning',
		sourceIp: '45.67.88.204',
		threatLevel: 'Low',
		time: '10:29:48',
	},
	{
		attackType: 'Brute Force Attempt',
		sourceIp: '151.80.33.19',
		threatLevel: 'Medium',
		time: '10:22:03',
	},
]

function getThreatBadge(level) {
	if (level === 'High') {
		return 'border-red-500/40 bg-red-500/10 text-red-300'
	}
	if (level === 'Medium') {
		return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
	}
	return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
}

function getStatusBadge(status) {
	if (status === 'Blocked') {
		return 'border-red-500/40 bg-red-500/10 text-red-300'
	}
	if (status === 'Monitored') {
		return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
	}
	return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
}

export default function Dashboard() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100">
			<div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[260px_1fr]">
				<aside className="border-b border-slate-800/70 bg-slate-900/70 p-5 backdrop-blur-md lg:border-b-0 lg:border-r">
					<div className="flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 shadow-lg shadow-cyan-900/20">
						<Radar className="h-5 w-5 text-cyan-300" />
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Security Node</p>
							<p className="text-sm font-semibold text-cyan-100">IPS-IDS Core</p>
						</div>
					</div>

					<nav className="mt-7 space-y-2">
						<button className="flex w-full items-center gap-3 rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-3 text-sm font-medium text-cyan-200 shadow transition hover:-translate-y-0.5 hover:bg-cyan-500/25">
							<LayoutDashboard className="h-4 w-4" />
							Dashboard
						</button>
						<button className="flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-300 transition hover:-translate-y-0.5 hover:border-slate-500 hover:text-slate-100">
							<Activity className="h-4 w-4" />
							Traffic Monitor
						</button>
						<button className="flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-300 transition hover:-translate-y-0.5 hover:border-slate-500 hover:text-slate-100">
							<AlertTriangle className="h-4 w-4" />
							Threat Intelligence
						</button>
						<button className="flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-300 transition hover:-translate-y-0.5 hover:border-slate-500 hover:text-slate-100">
							<Server className="h-4 w-4" />
							System Health
						</button>
					</nav>
				</aside>

				<main className="p-5 sm:p-8">
					<header className="mb-8 flex flex-wrap items-center justify-between gap-4">
						<div>
							<h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
								IDS / IPS Security Dashboard
							</h1>
							<p className="mt-2 text-sm text-slate-400">
								Real-time visibility into traffic, threats, and response actions.
							</p>
						</div>
						<div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 shadow">
							System Online
						</div>
					</header>

					<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{stats.map((item) => {
							const Icon = item.icon
							return (
								<article
									key={item.title}
									className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40 transition hover:-translate-y-1 hover:border-slate-700"
								>
									<div className="flex items-start justify-between gap-3">
										<div>
											<p className="text-sm text-slate-400">{item.title}</p>
											<p className="mt-2 text-2xl font-bold text-slate-100">{item.value}</p>
										</div>
										<div className={`rounded-lg border p-2 ${item.chip}`}>
											<Icon className={`h-5 w-5 ${item.color}`} />
										</div>
									</div>
									<p className="mt-3 text-xs text-slate-400">{item.subtitle}</p>
								</article>
							)
						})}
					</section>

					<section className="mt-8 grid gap-6 xl:grid-cols-2">
						<article className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-lg font-semibold text-slate-100">Recent Network Activity</h2>
								<span className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300">
									Live Feed
								</span>
							</div>
							<div className="overflow-x-auto">
								<table className="min-w-full text-left text-sm">
									<thead>
										<tr className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
											<th className="px-3 py-3">Source IP</th>
											<th className="px-3 py-3">Destination IP</th>
											<th className="px-3 py-3">Protocol</th>
											<th className="px-3 py-3">Status</th>
										</tr>
									</thead>
									<tbody>
										{networkActivity.map((row) => (
											<tr
												key={`${row.sourceIp}-${row.destinationIp}-${row.protocol}`}
												className="border-b border-slate-800/70 text-slate-200 transition hover:bg-slate-800/40"
											>
												<td className="px-3 py-3 font-medium">{row.sourceIp}</td>
												<td className="px-3 py-3">{row.destinationIp}</td>
												<td className="px-3 py-3">{row.protocol}</td>
												<td className="px-3 py-3">
													<span
														className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${getStatusBadge(row.status)}`}
													>
														{row.status}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</article>

						<article className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-lg font-semibold text-slate-100">Detected Threats</h2>
								<span className="rounded-md border border-rose-500/40 bg-rose-500/10 px-2 py-1 text-xs text-rose-300">
									Active Alerts
								</span>
							</div>
							<div className="overflow-x-auto">
								<table className="min-w-full text-left text-sm">
									<thead>
										<tr className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
											<th className="px-3 py-3">Attack Type</th>
											<th className="px-3 py-3">Source IP</th>
											<th className="px-3 py-3">Threat Level</th>
											<th className="px-3 py-3">Time</th>
										</tr>
									</thead>
									<tbody>
										{threats.map((row) => (
											<tr
												key={`${row.attackType}-${row.sourceIp}-${row.time}`}
												className="border-b border-slate-800/70 text-slate-200 transition hover:bg-slate-800/40"
											>
												<td className="px-3 py-3 font-medium">{row.attackType}</td>
												<td className="px-3 py-3">{row.sourceIp}</td>
												<td className="px-3 py-3">
													<span
														className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${getThreatBadge(row.threatLevel)}`}
													>
														{row.threatLevel}
													</span>
												</td>
												<td className="px-3 py-3">{row.time}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</article>
					</section>
				</main>
			</div>
		</div>
	)
}
