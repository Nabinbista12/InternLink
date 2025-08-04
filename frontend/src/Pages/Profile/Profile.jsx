import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../Auth/Auth";
import Navbar from "../../Component/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", bio: "" });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        console.log("Profile data:", data); // Debug log
        setProfile(data);
        setEditData({
          name: data.user?.name || "",
          bio: data.user?.bio || ""
        });
        setError(null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: profile.user?.name || "",
      bio: profile.user?.bio || ""
    });
  };

  const handleSave = async () => {
    try {
      setUpdating(true);
      const updatedProfile = await updateProfile(editData);
      setProfile(prev => ({
        ...prev,
        user: updatedProfile.user
      }));
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <p>Loading...</p>
      </div>
    </div>
  );

  if (error) return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );

  if (!profile) return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <p>No profile data available.</p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold">My Profile</h2>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {profile.user?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {profile.user?.email || 'N/A'}</p>
              <p><strong>Username:</strong> {profile.user?.username || 'N/A'}</p>
              <div>
                <strong>Bio:</strong> 
                <p className="mt-1 text-gray-700">
                  {profile.user?.bio || 'No bio added yet.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (read-only)
                </label>
                <input
                  type="email"
                  value={profile.user?.email || ''}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username (read-only)
                </label>
                <input
                  type="text"
                  value={profile.user?.username || ''}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={updating}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
                >
                  {updating ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={updating}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">My Posts ({profile.posts?.length || 0})</h3>
          {!profile.posts || profile.posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            <div className="space-y-4">
              {profile.posts.map(post => (
                <div key={post._id} className="border-b pb-4">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                  <p className="text-gray-900">{post.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
