import React, { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaFilm, FaUsers, FaStar, FaClock } from "react-icons/fa";
import { CircleLoader } from "react-spinners";

const API_BASE = "https://b12-a10-movie-master-server.vercel.app";

const StatCard = ({ title, value, hint, icon: Icon, gradient }) => (
  <div className="p-5 rounded-2xl bg-white shadow border border-gray-100 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${gradient}`}
    >
      <Icon />
    </div>
    <div className="flex-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
    </div>
  </div>
);

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [statsRes, moviesRes, topRes, latestRes] = await Promise.all([
          fetch(`${API_BASE}/stats`).then((r) => r.json()),
          fetch(`${API_BASE}/movies?limit=100`).then((r) => r.json()),
          fetch(`${API_BASE}/top-rated`).then((r) => r.json()),
          fetch(`${API_BASE}/latestMovies`).then((r) => r.json()),
        ]);

        setStats({
          totalMovies: statsRes.totalMovies || 0,
          totalUsers: statsRes.totalUsers || 0,
        });
        setMovies(moviesRes.movies || []);
        setTopRated(topRes || []);
        setLatest(latestRes || []);
        setError("");
      } catch (err) {
        console.log(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const avgRating = useMemo(() => {
    if (!movies.length) return 0;
    const total = movies.reduce((sum, m) => sum + (Number(m.rating) || 0), 0);
    return (total / movies.length).toFixed(1);
  }, [movies]);

  const totalDuration = useMemo(() => {
    if (!movies.length) return 0;
    return movies.reduce((sum, m) => sum + (Number(m.duration) || 0), 0);
  }, [movies]);

  const genreData = useMemo(() => {
    const counts = movies.reduce((acc, m) => {
      const g = m.genre || "Other";
      acc[g] = (acc[g] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [movies]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Dashboard
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">Statistics</h1>
        </div>
      </div>

      {loading ? (
        <div className="w-full h-64 bg-white border border-gray-100 rounded-2xl shadow flex items-center justify-center text-gray-500">
          <CircleLoader size={60} color="#FF6B6B" />{" "}
        </div>
      ) : error ? (
        <div className="w-full h-64 bg-white border border-red-100 rounded-2xl shadow flex items-center justify-center text-red-600">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Movies"
              value={stats.totalMovies}
              hint="Catalog size"
              icon={FaFilm}
              gradient="bg-gradient-to-br from-orange-500 to-pink-500"
            />
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              hint="Registered"
              icon={FaUsers}
              gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
            />
            <StatCard
              title="Avg Rating"
              value={avgRating}
              hint="Across loaded movies"
              icon={FaStar}
              gradient="bg-gradient-to-br from-yellow-400 to-orange-400"
            />
            <StatCard
              title="Total Runtime"
              value={`${totalDuration} min`}
              hint="Sum of durations"
              icon={FaClock}
              gradient="bg-gradient-to-br from-green-500 to-emerald-500"
            />
          </div>

          <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Genre Distribution
              </h2>
              <span className="text-xs text-gray-500">Top genres</span>
            </div>
            {genreData.length ? (
              <div className="w-full h-72 flex items-center justify-center">
                <div className="w-full max-w-4xl h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={genreData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#ff512f"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Not enough data yet.</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Top Rated</h2>
                <span className="text-xs text-gray-500">Latest fetch</span>
              </div>
              <ul className="space-y-3">
                {topRated.slice(0, 5).map((movie) => (
                  <li
                    key={movie._id}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {movie.title}
                      </p>
                      <p className="text-xs text-gray-500">{movie.genre}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                      {movie.rating}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Latest Releases
                </h2>
                <span className="text-xs text-gray-500">Newest first</span>
              </div>
              <ul className="space-y-3">
                {latest.slice(0, 5).map((movie) => (
                  <li
                    key={movie._id}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {movie.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {movie.releaseYear || "Year N/A"}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700">
                      {movie.genre || "Genre"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
