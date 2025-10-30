import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu } from "lucide-react";

import Loader from '../pages/Loader';
const Sidebar = ({ refreshTrigger }) => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching user from localStorage

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      setUserProfile(foundUser);
    } else {
      setUserProfile(null);
    }

    setLoading(false);
  }, [id,refreshTrigger]);

  if (loading) {
    return <Loader />;
  }

  if (!userProfile) {
    return (
      <>
     <button className="w-full py-3 mb-4 border-b border-[#2e2e2e] text-2xl font-bold tracking-wide">
    <Link to={`/user/${id}`} className="flex justify-center items-center space-x-1">
      <span className="text-primary ">Code</span>
      <span className="text-accent ">Share</span>
    </Link>
   </button>

      <div className="text-red border-[3px] rounded-md text-center border-gray-300 p-2">
        <Loader/>
      </div>
       </>
    );
  }

  return (
 <>
      {/* Desktop Sidebar */}
    
<aside className="bg-black hidden  border-[#2e2e2e] h-screen text-gray-300 w-1/4  sm:flex  flex-col  p-3 font-mono">
  
  {/* Logo Section */}
  <button className="w-full py-3 mb-4 border-b border-[#2e2e2e] text-2xl font-bold tracking-wide">
    <Link to={`/user/${id}`} className="flex justify-center items-center space-x-1">
      <span className="text-primary ">Code</span>
      <span className="text-accent ">Share</span>
    </Link>
  </button>

  {/* Snippet List */}
  <ul className="flex flex-col gap-2 overflow-y-auto">
    {userProfile.snippets && userProfile.snippets.length > 0 ? (
      userProfile.snippets.map((snippet) => (
        <li
          key={snippet._id || snippet.id}
          className="m-1 flex items-center justify-between group rounded-md px-2 py-1 hover:bg-[#1a1a1a] transition-all"
        >
          <Link
            to={`/main/${id}/view/${snippet._id || snippet.id}`}
            className="truncate text-sm text-gray-300 group-hover:text-blue-400 transition-colors"
          >
            {snippet.heading}
          </Link>
        </li>
      ))
    ) : (
      <li className="text-gray-500 italic text-sm mt-4 text-center">
        No snippets available.
      </li>
    )}
  </ul>
</aside>

      {/* Mobile Topbar */}
      <div className="sm:hidden w-full flex justify-between items-center bg-black border-b border-[#2e2e2e] text-gray-300 px-4 py-3 font-mono relative">
        {/* Brand */}
       <button className="w-full py-3 mb-4 border-b border-[#2e2e2e] text-2xl font-bold tracking-wide">
    <Link to={`/user/${id}`} className="flex  items-center space-x-1">
      <span className="text-primary ">Code</span>
      <span className="text-accent ">Share</span>
    </Link>
  </button>

        {/* Menu Icon */}
        <button onClick={() => setOpen(!open)}>
          <Menu size={24} className="text-gray-300" />
        </button>

        {/* Dropdown Snippet List */}
        {open && (
          <ul className="absolute top-full right-0 mt-1 bg-[#111] border border-[#2e2e2e] w-full rounded-lg shadow-lg p-2 z-50">
            {userProfile.snippets && userProfile.snippets.length > 0 ? (
              userProfile.snippets.map((snippet) => (
                <li
                  key={snippet._id || snippet.id}
                  className="px-2 py-1 rounded-md hover:bg-[#1a1a1a] transition-all"
                >
                  <Link
                    to={`/main/${id}/view/${snippet._id || snippet.id}`}
                    className="block text-sm text-gray-300 hover:text-purple-400"
                    onClick={() => setOpen(false)}
                  >
                    {snippet.heading}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic text-sm text-center">
                No snippets
              </li>
            )}
          </ul>
        )}
      </div>
    </>

  );
};

export default Sidebar;
