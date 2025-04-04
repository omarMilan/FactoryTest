import Dashboard from "../components/dashboard";
import TaskHolder from "../components/taskHolder";

export default function MainPage() {
  return (
    <div className="h-screen w-screen bg-Secondary flex flex-row">
      <Dashboard />
      <TaskHolder />
    </div>
  );
}
