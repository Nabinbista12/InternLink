import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  // Fetch posts on mount
  useEffect(() => {
    axios.get("http://localhost:3000/api/posts/getpost")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Submit new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Post text cannot be empty");

    try {
      // You must send JWT token in headers (assuming it's stored in localStorage)
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/api/posts/save", { text }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPosts([res.data, ...posts]);
      setText("");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Write a post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded">
          Post
        </button>
      </form>

      <div>
        {posts.map(post => (
          <div key={post._id} className="border p-4 rounded mb-4">
            <div className="text-sm text-gray-500 mb-1">
              <Link 
                to={`/user/${post.author._id}`} 
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
              >
                {post.author.name || post.author.username}
              </Link>
              <span> &middot; {new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
