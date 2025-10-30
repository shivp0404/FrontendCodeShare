import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaLinkedin, FaGithub, FaClipboard } from "react-icons/fa";
import { SiReplit } from "react-icons/si";
import { FaTimes } from "react-icons/fa";
import { FiTrash2, FiEdit } from 'react-icons/fi';
import CodeViewer from '../components/CodeViewer';

const CodeViewerPage = () => {
  const { id, id2 } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const codeRef = useRef();

  useEffect(() => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((u) => u.id === id);
      const foundSnippet = user?.snippets?.find((s) => s._id === id2);
      if (foundSnippet) setSnippet(foundSnippet);
    } catch (error) {
      console.error('Error loading snippet:', error);
    }
  }, [id, id2]);

  const handleDelete = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) return;

      users[userIndex].snippets = users[userIndex].snippets.filter((s) => s._id !== id2);
      localStorage.setItem('users', JSON.stringify(users));

      toast.success('Snippet deleted successfully!');
      navigate(`/main/${id}`);
    } catch (error) {
      console.error('Error deleting snippet:', error);
      toast.error('Error deleting snippet');
    }
  };

  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText)
        .then(() => toast.success('Code copied!'))
        .catch(() => toast.error('Failed to copy code'));
    }
  };

  if (!snippet) {
    return <p className="text-center text-gray-400 mt-10">Snippet not found.</p>;
  }

  const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    github: `https://github.com/new?template=${encodeURIComponent(window.location.href)}`,
    replit: `https://replit.com/~?url=${encodeURIComponent(window.location.href)}`,
  };

  return (
    <div className="bg-black w-full min-h-screen px-4 py-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <Link to={`/user/${id}`} className=" text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
          {snippet.heading}
        </Link>

        {/* Social Share */}
        <div className="flex flex-wrap items-center justify-center gap-2 my-2 sm:my-0">
          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bg-green-500 p-2 rounded-md">
           <FaLinkedin size={20} />
          </a>
          <a href={shareLinks.github} target="_blank" rel="noopener noreferrer" className="bg-blue-700 p-2 rounded-md">
               <FaGithub size={20} />
          </a>
          <a href={shareLinks.replit} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 p-2 rounded-md">
           <SiReplit size={20} />
          </a>
      
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link to={`/main/${id}/edit/${id2}`} className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600">
            <FiEdit />
          </Link>
          <Link to={`/user/${id}`} className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600">
            <FaTimes />
          </Link>
          <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600">
            <FiTrash2 />
          </button>
          <button onClick={copyToClipboard} className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600">
            <FaClipboard />
          </button>
        </div>
      </div>

      {/* Description & Tags */}
      <div className=" text-gray-300 mb-4">
        <p className="mb-2 italic">{snippet.description || "No description provided."}</p>
        {snippet.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag, index) => (
              <span key={index} className="bg-gray-800 px-2 py-1 text-sm rounded-md text-blue-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Code Viewer */}
      <div ref={codeRef} className="rounded-lg overflow-hidden  border-gray-700 shadow-lg">
        <CodeViewer codeString={snippet.code} />
      </div>
    </div>
  );
};

export default CodeViewerPage;
