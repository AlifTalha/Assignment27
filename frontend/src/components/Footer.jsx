import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-white font-bold text-lg">NewsPortal</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted source for the latest news, breaking stories, and in-depth analysis from around the world.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">All News</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {['Politics', 'Sports', 'Technology', 'Entertainment', 'Business'].map((cat) => (
                <li key={cat}>
                  <Link to={`/news?category=${cat}`} className="hover:text-white transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@newsportal.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 News Street, Media City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} NewsPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
