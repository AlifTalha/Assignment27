import { Link } from 'react-router-dom';

const categoryColors = {
  Politics: 'bg-blue-100 text-blue-800',
  Sports: 'bg-green-100 text-green-800',
  Technology: 'bg-purple-100 text-purple-800',
  Entertainment: 'bg-pink-100 text-pink-800',
  Business: 'bg-yellow-100 text-yellow-800',
  Health: 'bg-teal-100 text-teal-800',
  World: 'bg-orange-100 text-orange-800',
};

export default function NewsCard({ news, variant = 'default' }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (variant === 'featured') {
    return (
      <Link to={`/news/${news._id}`} className="group relative block overflow-hidden rounded-xl h-80">
        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${categoryColors[news.category] || 'bg-gray-100 text-gray-800'}`}>
            {news.category}
          </span>
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-red-300 transition-colors">{news.title}</h3>
          <p className="text-sm text-gray-300">{formatDate(news.createdAt)} · {news.views} views</p>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/news/${news._id}`} className="group flex gap-4 bg-white rounded-lg p-3 hover:shadow-md transition-shadow">
        <img src={news.image} alt={news.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-1 ${categoryColors[news.category] || 'bg-gray-100 text-gray-800'}`}>
            {news.category}
          </span>
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-accent transition-colors">{news.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{formatDate(news.createdAt)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/news/${news._id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${categoryColors[news.category] || 'bg-gray-100 text-gray-800'}`}>
          {news.category}
        </span>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-accent transition-colors">{news.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{news.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{news.author?.name || 'Anonymous'}</span>
          <span>{formatDate(news.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export { categoryColors };
