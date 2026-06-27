import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { newsAPI } from '../services/api';
import NewsCard from '../components/NewsCard';

const CATEGORIES = ['All', 'Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health', 'World'];

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [news, setNews] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || 'All';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 12 };
        if (category !== 'All') params.category = category;

        const res = await newsAPI.getAll(params);
        setNews(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, page]);

  const handleCategoryChange = (cat) => {
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  const handlePageChange = (newPage) => {
    const params = { page: newPage.toString() };
    if (category !== 'All') params.category = category;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All News</h1>
        <p className="text-gray-500">Browse all published news articles</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-accent text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      ) : news.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    p === pagination.page
                      ? 'bg-accent text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl">
          <p className="text-gray-500 text-lg">No news articles found in this category.</p>
        </div>
      )}
    </div>
  );
}
