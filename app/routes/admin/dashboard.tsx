import { Header } from "../../../components";

const Dashboard = () => {
  const user = { name: "James" };

  return (
    <main className="dashboard wrapper">
      <Header 
        title={`Welcome ${user?.name ?? 'Guest'} 👋`}
        description="Track activity, trends and popular destinations"
      />
      Dashboard Page Contents
    </main>
  );
};

export default Dashboard;
