import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ role, onLogout }) {
  // Hamburger Switch
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-xs border-b border-white/10">
      <div className="maax-w-full px-2 sm:px-18 lg:px-28">
        <div className="relative flex h-16 items-center justify-between">
          {/* Hamburger Menu */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Buka menu utama</span>
              {/* Ikon Hamburger / X */}
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Bagian Tengah */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link
                to="/"
                className="text-white font-bold text-xl tracking-wide"
              >
                🏢 JobLoker
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                >
                  Beranda
                </Link>
                {role === "admin" && (
                  <Link
                    to="/dashboard-hrd"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Dashboard
                  </Link>
                )}
                {role === "admin" && (
                  <Link
                    to="/job-posting"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Posting Lowongan
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Bagian Kanan (Login / Profil) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* JIKA BELUM LOGIN */}
            {!role && (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}

            {/* JIKA SUDAH LOGIN (Munculkan Avatar Dropdown) */}
            {role && (
              <div className="relative ml-3">
                {/* Tombol Foto Profil */}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Buka menu pengguna</span>
                    {/* Menggunakan foto profil dummy acak */}
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                {/* Kotak Dropdown Profil */}
                {isProfileOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="block px-4 py-2 text-xs text-gray-400 border-b">
                      Masuk sebagai: {role}
                    </div>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false); // Tutup menu
                        onLogout(); // Jalankan fungsi logout
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bagian Menu HP (Hanya muncul jika tombol Hamburger diklik) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            >
              Beranda
            </Link>
            {role === "admin" && (
              <Link
                to="/dashboard-hrd"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Dashboard
              </Link>
            )}
            {role === "admin" && (
              <Link
                to="/job-posting"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Posting Lowongan
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
