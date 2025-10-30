import React from 'react';
import Navbar from './Navbar';
import Sidebar from '../components/Sidebar';
import CodeEditor from '../components/CodeEditor';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Editpage = () => {
  const {id,id2} = useParams()
  const [formdata, setFormData] = useState({
    heading: '',
    description: '',
    code: '',
    tagInput: ''
  });
useEffect(() => {
  const fetchCode = () => {
    try {
      // 🧠 Get all users
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // 🔍 Find the user by ID
      const user = users.find((u) => u.id === id);
      if (!user) {
        toast.error("User not found");
        return;
      }

      // 🧩 Find the snippet by snippet ID
      const snippet = user.snippets?.find((s) => s._id === id2);
      if (!snippet) {
        toast.error("Snippet not found");
        return;
      }

      // ✅ Set data into form for editing
      setFormData({
        heading: snippet.heading,
        description: snippet.description,
        code: snippet.code,
        tagInput: snippet.tags?.join(", ") || ""
      });

    } catch (error) {
      console.error("Error fetching snippet:", error);
      toast.error("Error fetching snippet!");
    }
  };

  fetchCode();
}, [id, id2]);

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formdata, [name]: value });
  };

    const handleSnippetCreated = () => {
    setRefreshTrigger((prev) => !prev); // Force Sidebar to re-render
  };




const handleSubmit = (event) => {
  event.preventDefault();
  try {
    // 🧠 1. Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔍 2. Find the user by id
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      toast.error("User not found!");
      return;
    }

    // 🧩 3. Find the snippet by id2 inside user's snippets
    const snippetIndex = users[userIndex].snippets.findIndex((s) => s._id === id2);
    if (snippetIndex === -1) {
      toast.error("Snippet not found!");
      return;
    }

    // 🧱 4. Update the snippet
    users[userIndex].snippets[snippetIndex] = {
      ...users[userIndex].snippets[snippetIndex],
      heading: formdata.heading,
      description: formdata.description,
      code: formdata.code,
      tags: formdata.tagInput.split(',').map(tag => tag.trim()).filter(Boolean),
      updatedAt: new Date().toISOString()
    };

    // 💾 5. Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // 🧽 6. Reset form (optional)
    setFormData({
      heading: '',
      description: '',
      code: '',
      tagInput: ''
    });

    toast.success("Snippet edited successfully!");
     handleSnippetCreated();
  } catch (error) {
    console.error("Error editing snippet:", error);
    toast.error("Error editing snippet!");
  }
};

  

  return (
 <div className="min-h-screen bg-black">
  <div className="flex flex-col sm:flex-row ">
    <Sidebar refreshTrigger={refreshTrigger} />
    <CodeEditor
      handlesubmit={handleSubmit}
      handlechange={handleChange}
      formData={formdata}
    />
  </div>
</div>
  );
};

export default Editpage;
