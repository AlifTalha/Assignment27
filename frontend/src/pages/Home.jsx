import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsAPI } from '../services/api';
import NewsCard from '../components/NewsCard';

const CATEGORIES = ['Technology', 'Sports', 'Politics', 'Entertainment'];

export default function Home() {
  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [categoryNews, setCategoryNews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topRes, latestRes, ...catRes] = await Promise.all([
          newsAPI.getTop(),
          newsAPI.getLatest(),
          ...CATEGORIES.map((cat) => newsAPI.getByCategory(cat)),
        ]);

        setTopNews(topRes.data.data);
        setLatestNews(latestRes.data.data);

        const catData = {};
        CATEGORIES.forEach((cat, i) => {
          catData[cat] = catRes[i].data.data;
        });
        setCategoryNews(catData);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Stay Informed, Stay Ahead</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Get the latest breaking news, in-depth analysis, and stories that matter from trusted journalists around the world.
          </p>
        </div>
      </section>

      {/* Section 1: Top 6 News */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1 h-8 bg-accent rounded-full" />
            Top Stories
          </h2>
          <Link to="/news" className="text-accent hover:text-accent-hover font-medium text-sm">
            View All →
          </Link>
        </div>

        {topNews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NewsCard news={topNews[0]} variant="featured" />
            </div>
            <div className="space-y-3">
              {topNews.slice(1, 6).map((news) => (
                <NewsCard key={news._id} news={news} variant="horizontal" />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">No news articles yet. Be the first to publish!</p>
            <Link to="/register" className="inline-block mt-4 text-accent font-medium hover:underline">Register to create news</Link>
          </div>
        )}
      </section>

      {/* Section 2: Latest News */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-8 bg-primary rounded-full" />
              Latest News
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 & 4: Category Sections */}
      {CATEGORIES.slice(0, 2).map((category) => (
        <section key={category} className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-8 bg-accent rounded-full" />
              {category}
            </h2>
            <Link to={`/news?category=${category}`} className="text-accent hover:text-accent-hover font-medium text-sm">
              More {category} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(categoryNews[category] || []).map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </section>
      ))}

      {/* Section 5: Newsletter / CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Become a News Contributor</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join our community of journalists and share your stories with thousands of readers worldwide.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Get Started
            </Link>
            <Link to="/news" className="border border-gray-600 hover:border-white text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Browse News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
