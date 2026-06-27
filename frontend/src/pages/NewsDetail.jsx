import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsAPI } from '../services/api';
import { categoryColors } from '../components/NewsCard';

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await newsAPI.getById(id);
        setNews(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <p className="text-gray-500 mb-6">{error || 'The news article you are looking for does not exist.'}</p>
        <Link to="/news" className="text-accent font-medium hover:underline">← Back to News</Link>
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/news" className="inline-flex items-center text-accent hover:text-accent-hover font-medium mb-6 transition-colors">
        ← Back to News
      </Link>

      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${categoryColors[news.category] || 'bg-gray-100 text-gray-800'}`}>
        {news.category}
      </span>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{news.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
            {news.author?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <span className="font-medium text-gray-700">{news.author?.name || 'Anonymous'}</span>
        </div>
        <span>·</span>
        <span>{formatDate(news.createdAt)}</span>
        <span>·</span>
        <span>{news.views} views</span>
      </div>

      <div className="rounded-xl overflow-hidden mb-8">
        <img src={news.image} alt={news.title} className="w-full max-h-[500px] object-cover" />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
        {news.content}
      </div>
    </article>
  );
}
