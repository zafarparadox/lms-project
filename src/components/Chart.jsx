import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", progress: 20 },
  { name: "Tue", progress: 40 },
  { name: "Wed", progress: 35 },
  { name: "Thu", progress: 60 },
  { name: "Fri", progress: 75 },
  { name: "Sat", progress: 90 },
];

function Chart() {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Weekly Progress 📈
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;