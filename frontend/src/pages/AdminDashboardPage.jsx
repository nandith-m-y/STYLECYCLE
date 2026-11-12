import React, { useState } from "react";
import { 
  ADMIN_METRICS, 
  SALES_OVER_TIME, 
  CATEGORY_DISTRIBUTION, 
  MONTHLY_EXCHANGES, 
  RECENT_MODERATION_ITEMS, 
  ADMIN_USERS_LIST 
} from "../data/adminStats";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, 
  BarChart, Bar, Legend, CartesianGrid 
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Package, 
  ArrowLeftRight, 
  ShoppingBag, 
  ShieldCheck, 
  Leaf, 
  DollarSign, 
  Check, 
  X, 
  Clock 
} from "lucide-react";

export const AdminDashboardPage = () => {
  const [moderationList, setModerationList] = useState(RECENT_MODERATION_ITEMS);

  const handleApprove = (id) => {
    setModerationList(prev => prev.map(m => m.id === id ? { ...m, status: "Approved" } : m));
  };

  const handleReject = (id) => {
    setModerationList(prev => prev.map(m => m.id === id ? { ...m, status: "Rejected" } : m));
  };

  return (
    <div className="space-y-8">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Gross Marketplace Sales", value: ADMIN_METRICS.marketplaceRevenue, icon: DollarSign, color: "text-emerald-700 bg-emerald-50" },
          { label: "Registered Circular Users", value: ADMIN_METRICS.totalUsers.toLocaleString("en-IN"), icon: Users, color: "text-blue-700 bg-blue-50" },
          { label: "Active Garments", value: ADMIN_METRICS.totalProducts.toLocaleString("en-IN"), icon: Package, color: "text-amber-700 bg-amber-50" },
          { label: "Completed Orders", value: ADMIN_METRICS.totalOrders.toLocaleString("en-IN"), icon: ShoppingBag, color: "text-purple-700 bg-purple-50" },
          { label: "Wardrobe Exchanges", value: ADMIN_METRICS.totalExchanges.toLocaleString("en-IN"), icon: ArrowLeftRight, color: "text-teal-700 bg-teal-50" },
          { label: "CO₂ Avoided (kg)", value: ADMIN_METRICS.circularEconomyCo2SavedKg.toLocaleString("en-IN"), icon: Leaf, color: "text-primary bg-primary-soft" }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-4 rounded-sm border border-border shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-dark-muted">{stat.label}</span>
                <div className={`p-1.5 rounded-full ${stat.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-lg font-bold text-dark">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sales Over Time (Area Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-border shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="font-serif text-lg font-bold text-dark">Platform GMV & Order Trajectory</h3>
              <p className="text-xs text-dark-muted">Monthly gross marketplace turnover (in INR)</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              +38% MoM Growth
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_OVER_TIME}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#234B3B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#234B3B" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E1" />
                <XAxis dataKey="month" stroke="#777777" fontSize={11} />
                <YAxis stroke="#777777" fontSize={11} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Marketplace Sales"]} />
                <Area type="monotone" dataKey="sales" stroke="#234B3B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown (Pie Chart) */}
        <div className="bg-white p-6 rounded-sm border border-border shadow-subtle space-y-4">
          <div className="pb-3 border-b border-border">
            <h3 className="font-serif text-lg font-bold text-dark">Category Distribution</h3>
            <p className="text-xs text-dark-muted">Percentage of cataloged garments</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {CATEGORY_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-dark-muted">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-dark">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Monthly Exchanges Bar Chart */}
      <div className="bg-white p-6 rounded-sm border border-border shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="font-serif text-lg font-bold text-dark">Circular Wardrobe Exchanges</h3>
            <p className="text-xs text-dark-muted">Requested proposals vs completed physical swaps</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_EXCHANGES}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E1" />
              <XAxis dataKey="month" stroke="#777777" fontSize={11} />
              <YAxis stroke="#777777" fontSize={11} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="requested" name="Proposals Submitted" fill="#BBA580" radius={[2, 2, 0, 0]} />
              <Bar dataKey="completed" name="Swaps Finalized" fill="#234B3B" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Moderation Queue Section */}
      <div id="moderation" className="bg-white p-6 rounded-sm border border-border shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="font-serif text-lg font-bold text-dark">Product Authenticity & Moderation Queue</h3>
            <p className="text-xs text-dark-muted">Verified seller submissions pending brand verification</p>
          </div>
        </div>

        <div className="overflow-x-auto border border-border rounded-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary text-dark-muted border-b border-border">
              <tr>
                <th className="p-3 font-semibold">Ref ID</th>
                <th className="p-3 font-semibold">Listing Title</th>
                <th className="p-3 font-semibold">Seller</th>
                <th className="p-3 font-semibold">Asking Price</th>
                <th className="p-3 font-semibold">Verification Score</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {moderationList.map((mod) => (
                <tr key={mod.id} className="hover:bg-secondary/40">
                  <td className="p-3 font-bold text-dark">{mod.id}</td>
                  <td className="p-3 font-medium text-dark">{mod.title}</td>
                  <td className="p-3 text-dark-muted">{mod.seller}</td>
                  <td className="p-3 font-bold text-dark">₹{mod.price.toLocaleString("en-IN")}</td>
                  <td className="p-3">
                    <span className="font-semibold text-emerald-800">{mod.authenticityScore}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      mod.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                      mod.status === "Rejected" ? "bg-rose-100 text-rose-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {mod.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {mod.status === "Under Review" ? (
                      <>
                        <button
                          onClick={() => handleApprove(mod.id)}
                          className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-800"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(mod.id)}
                          className="px-2.5 py-1 bg-rose-700 text-white rounded font-bold hover:bg-rose-800"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-dark-muted text-[11px] italic">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Directory */}
      <div id="users" className="bg-white p-6 rounded-sm border border-border shadow-subtle space-y-4">
        <div className="pb-3 border-b border-border">
          <h3 className="font-serif text-lg font-bold text-dark">Community User Directory</h3>
          <p className="text-xs text-dark-muted">Platform participants, activity rankings and trust badges</p>
        </div>

        <div className="overflow-x-auto border border-border rounded-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary text-dark-muted border-b border-border">
              <tr>
                <th className="p-3 font-semibold">User Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold">Listings</th>
                <th className="p-3 font-semibold">Purchases</th>
                <th className="p-3 font-semibold">Rating</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ADMIN_USERS_LIST.map((u) => (
                <tr key={u.id} className="hover:bg-secondary/40">
                  <td className="p-3 font-bold text-dark">{u.name}</td>
                  <td className="p-3 text-dark-muted">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3 font-semibold">{u.listings}</td>
                  <td className="p-3 font-semibold">{u.purchases}</td>
                  <td className="p-3 font-bold text-amber-700">★ {u.rating}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
