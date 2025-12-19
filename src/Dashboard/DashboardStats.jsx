const DashboardStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
        <p className="text-sm opacity-90">Total Notes</p>
        <h2 className="text-3xl font-bold">{stats.totalNotes}</h2>
      </div>

      <div className="bg-purple-500 text-white p-6 rounded-xl shadow">
        <p className="text-sm opacity-90">Locked Notes</p>
        <h2 className="text-3xl font-bold">{stats.lockedNotes}</h2>
      </div>

      <div className="bg-green-500 text-white p-6 rounded-xl shadow">
        <p className="text-sm opacity-90">Todos</p>
        <h2 className="text-3xl font-bold">{stats.todos}</h2>
      </div>
    </div>
  );
};

export default DashboardStats;
