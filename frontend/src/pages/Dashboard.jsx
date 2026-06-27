import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { userAPI, newsAPI } from '../services/api';
import { categoryColors } from '../components/NewsCard';

export default function Dashboard() {
  const { user, updateUser } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [myNews, setMyNews] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', bio: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, newsRes] = await Promise.all([
          userAPI.getProfile(),
          userAPI.getMyNews(),
        ]);
        setProfile(profileRes.data.data);
        setMyNews(newsRes.data.data);
        setForm({
          name: profileRes.data.data.name,
          email: profileRes.data.data.email,
          bio: profileRes.data.data.bio || '',
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await userAPI.updateProfile(form);
      setProfile(res.data.data);
      updateUser({ name: res.data.data.name, email: res.data.data.email });
      setEditMode(false);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) return;

    try {
      await newsAPI.delete(id);
      setMyNews(myNews.filter((n) => n._id !== id));
      setMessage('News deleted successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete news');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Manage your profile and news articles</p>
        </div>
        <Link to="/dashboard/create" className="bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
          + Create News
        </Link>
      </div>

      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {message}
        </div>
      )}

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
          {!editMode && (
            <button onClick={() => setEditMode(true)} className="text-accent hover:text-accent-hover font-medium text-sm">
              Edit Profile
            </button>
          )}
        </div>

        {editMode ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => setEditMode(false)} className="text-gray-600 hover:text-gray-800 px-5 py-2 rounded-lg font-medium">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{profile?.name}</h3>
              <p className="text-gray-500">{profile?.email}</p>
              {profile?.bio && <p className="text-gray-600 mt-2">{profile.bio}</p>}
              <p className="text-sm text-gray-400 mt-2">Member since {new Date(profile?.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-400">{profile?.newsCount || 0} articles published</p>
            </div>
          </div>
        )}
      </div>

      {/* My News Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">My News Articles</h2>

        {myNews.length > 0 ? (
          <div className="space-y-4">
            {myNews.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-800'}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">{item.views} views</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link to={`/news/${item._id}`} className="text-gray-500 hover:text-primary px-3 py-1.5 text-sm font-medium">
                    View
                  </Link>
                  <Link to={`/dashboard/edit/${item._id}`} className="text-primary hover:text-primary-dark px-3 py-1.5 text-sm font-medium">
                    Edit
                  </Link>
                  <button onClick={() => handleDeleteNews(item._id)} className="text-red-500 hover:text-red-700 px-3 py-1.5 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven't published any news yet.</p>
            <Link to="/dashboard/create" className="text-accent font-medium hover:underline">Create your first article</Link>
          </div>
        )}
      </div>
    </div>
  );
}
