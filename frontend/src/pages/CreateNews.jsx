import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { newsAPI } from '../services/api';

const CATEGORIES = ['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health', 'World'];

export default function CreateNews() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Technology',
    image: '',
    excerpt: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await newsAPI.create(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create News Article</h1>
      <p className="text-gray-500 mb-8">Share your story with the world</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Enter news title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <input
            type="text"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder="Short summary (auto-generated if left empty)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
          <textarea
            required
            rows={12}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            placeholder="Write your news article here..."
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish News'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-800 px-6 py-2.5 rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
