import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CodeSnippetCard from "../components/CodeSnippetCard";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = () => {
      try {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.id === id);

        if (user) {
          if (!user.snippets) user.snippets = [];
          setUserProfile(user);
        } else {
          toast.error("User not found!");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Something went wrong!");
      }
    };

    fetchUserProfile();
  }, [id, navigate]);

  if (!userProfile) return <Loader text="Loading profile..." />;

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  // ✅ Delete Snippet
  const handleDelete = (snippetId) => {
    try {
      const updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUser = updatedUsers.find((u) => u.id === id);

      if (updatedUser) {
        updatedUser.snippets = updatedUser.snippets.filter(
          (snip) => snip._id !== snippetId
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUserProfile({ ...updatedUser });
        toast.success("Snippet deleted!");
      }
    } catch (error) {
      console.error("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-100 font-mono relative overflow-hidden">
   
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-700/5 rounded-full blur-[120px]" />
      </div>

      <Navbar />

      <div className="container mx-auto flex-grow z-10 px-6">
        {/* Profile Header */}
        <div className="flex justify-between items-center p-5 mt-6 border border-gray-800 rounded-xl bg-[#0f0f0f]/70">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              @{userProfile.username}
            </h2>
            <p className="text-gray-400">{userProfile.email || "No email added"}</p>
            <p className="text-gray-500 text-sm mt-1 italic">
              {userProfile.bio || "No bio yet"}
            </p>
          </div>

          <div className="flex gap-3">
            <Link to={`/main/${id}`}>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm transition-all">
                + Create Snippet
              </button>
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Snippets */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-6 text-gray-200">
            Your Snippets
          </h3>

          {userProfile.snippets.length > 0 ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {userProfile.snippets.map((snippet) => (
                <motion.li
                  key={snippet._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#111]/90 border border-gray-800 rounded-xl shadow-lg p-4 hover:border-purple-700 transition-all"
                >
                  {/* Heading */}
                  <h4 className="text-lg font-semibold text-purple-400 truncate">
                    {snippet.heading}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mt-1 line-clamp-3">
                    {snippet.description || "No description provided."}
                  </p>

                  {/* Code Preview */}
                  <div className="bg-[#0a0a0a] border border-gray-900 rounded-md mt-3 p-3 text-xs text-gray-300 font-mono overflow-hidden max-h-28">
                    <pre className="whitespace-pre-wrap">{snippet.code}</pre>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-3">
                    <Link to={`/main/${id}/edit/${snippet._id}`}>
                      <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-purple-700/40 rounded-md transition">
                        Edit
                      </button>
                    </Link>

                    <Link to={`/main/${id}/view/${snippet._id}`}>
                      <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-purple-700/40 rounded-md transition">
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(snippet._id)}
                      className="px-3 py-1 text-xs bg-red-700/60 hover:bg-red-700 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-20">
              No snippets created yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
