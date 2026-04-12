import Card from "../components/ui/Card";
import {
  dashboardStats,
  recentActivity,
  systemStatus,
} from "../data/mockData";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
         

          <h1 className="text-4xl sm:text-5xl italic font-semibold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-gray-500 sm:text-base">
            Overview of revenue, operations, activity, and overall system health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs tracking-wider text-gray-600">
              LIVE
            </span>
          </div>

          <button className="px-4 py-2 rounded-xl bg-black text-white text-sm hover:bg-gray-800 transition">
            + New
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item, index) => (
          <Card
            key={item.title}
            className="p-5 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                {item.title}
              </p>

              <span className="text-xs font-medium text-green-600">
                ↑ 12%
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl italic text-gray-900">
              {item.value}
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              {index === 0 && "Month-to-date performance"}
              {index === 1 && "Current operational spend"}
              {index === 2 && "Processed transactions"}
              {index === 3 && "Awaiting settlement"}
            </p>
          </Card>
        ))}
      </section>

      {/* Bottom Panels */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">

        {/* Activity */}
        <Card className="p-6">
          <div className="mb-6">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-400">
              Activity Feed
            </p>

            <h2 className="text-2xl italic text-gray-900">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-4">

                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  <div className="flex-1 w-[1px] bg-gray-200" />
                </div>

                <div className="flex-1 rounded-xl border bg-gray-50 px-4 py-3 hover:bg-gray-100 transition">
                  <p className="text-sm text-gray-800">{activity}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-gray-400">
                    System Log Entry
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-6">
          <div className="mb-6">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-400">
              Infrastructure
            </p>

            <h2 className="text-2xl italic text-gray-900">
              System Status
            </h2>
          </div>

          <div className="space-y-3">
            {systemStatus.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
              >
                <p className="text-sm text-gray-500">{item.label}</p>

                <span
                  className={`text-sm font-medium ${
                    item.value === "Online" || item.value === "Connected"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

      </section>
    </div>
  );
};

export default Dashboard;