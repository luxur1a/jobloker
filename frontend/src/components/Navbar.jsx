// 1. Panggil alat navigasi ajaib dari React Router
import { Link } from "react-router-dom";

function Navbar({ role, onLogout }) {
  return (
    <nav
      className="bg-slate-800 text-white flex h-20 justify-between items-center px-4w-full
    p-8"
    >
      {/* LOGO */}
      <div className="text-2xl font-bold tracking-wide">
        <Link
          to="/"
          className="text-white no-underline hover:text-blue-300 transition-colors"
        >
          🏢 JobLoker
        </Link>
      </div>

      {/* Beranda */}
      <div className="flex items-center gap-6 font-medium">
        <Link
          to="/"
          className="text-slate-200 hover:text-blue-300 transition-color"
        >
          Beranda
        </Link>

        {/* Tombol Login */}
        {!role && (
          <Link
            to="/login"
            className="px-4 py-2 bg-green-500 rounded border border-green-500
          hover:text-green-500 hover:bg-transparent transition-all"
          >
            Login
          </Link>
        )}

        {/* Tombol Logout */}
        {role && (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 rounded border border-red-500
          hover:text-red-500 hover:bg-transparent transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
