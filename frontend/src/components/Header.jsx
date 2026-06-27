import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const categories = ['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health', 'World'];

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-primary text-white text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>Breaking News & Updates</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NewsPortal</h1>
              <p className="text-xs text-gray-500">Your Daily News Source</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => `font-medium transition-colors ${isActive ? 'text-accent' : 'text-gray-700 hover:text-accent'}`}>
              Home
            </NavLink>
            <NavLink to="/news" className={({ isActive }) => `font-medium transition-colors ${isActive ? 'text-accent' : 'text-gray-700 hover:text-accent'}`}>
              News
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `font-medium transition-colors ${isActive ? 'text-accent' : 'text-gray-700 hover:text-accent'}`}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard/create" className="hidden sm:inline-flex bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  + Create News
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-accent transition-colors">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-medium">{user.name}</span>
                </Link>
                <button onClick={logout} className="text-gray-500 hover:text-accent text-sm font-medium transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-accent font-medium text-sm transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 py-2 overflow-x-auto">
          <div className="flex gap-4 text-sm">
            {categories.map((cat) => (
              <Link key={cat} to={`/news?category=${cat}`} className="text-gray-600 hover:text-accent whitespace-nowrap font-medium transition-colors">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
