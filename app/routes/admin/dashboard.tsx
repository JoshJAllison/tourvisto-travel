import { Header, StatsCard, TripCard } from "../../../components";

const Dashboard = () => {
  const user = { name: "James" };
  const dashboardStats = {
    totalUsers: 12450,
    usersJoined: { currentMonth: 218, lastMonth: 176},
    totalTrips: 3210,
    tripsCreated: { currentMonth: 150, lastMonth: 250},
    userRole: { total: 62, currentMonth: 25, lastMonth: 15}
  }

  return (
    <main className="dashboard wrapper">
      <Header 
        title={`Welcome ${user?.name ?? 'Guest'} 👋`}
        description="Track activity, trends and popular destinations in real time"
      />

      <StatsCard />
      <TripCard />
    </main>
  );
};

export default Dashboard;
