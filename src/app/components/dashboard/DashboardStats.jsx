import StatCard from "./StatCard";

const DashboardStats = ({ statsData = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatCard
          key={stat.id ?? index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default DashboardStats;