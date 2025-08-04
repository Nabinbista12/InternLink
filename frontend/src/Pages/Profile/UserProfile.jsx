import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../Auth/Auth";
import Navbar from "../../Component/Navbar";

export default function UserProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile(userId);
        console.log("User profile data:", data); // Debug log
        setProfile(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

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
          <h2 className="text-3xl font-bold mb-4">{profile.user?.name || 'User'}'s Profile</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {profile.user?.name || 'N/A'}</p>
            <p><strong>Username:</strong> {profile.user?.username || 'N/A'}</p>
            <p><strong>Email:</strong> {profile.user?.email || 'N/A'}</p>
            {profile.user?.bio && <p><strong>Bio:</strong> {profile.user.bio}</p>}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Posts ({profile.posts?.length || 0})</h3>
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
