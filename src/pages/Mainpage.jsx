import React from 'react';
import Navbar from './Navbar';
import Sidebar from '../components/Sidebar';
import CodeEditor from '../components/CodeEditor';
import { useParams } from 'react-router';
import { useState } from 'react';
import uuid from 'react-uuid';

import toast from 'react-hot-toast';
const Mainpage = () => {
  const id = useParams()
  const [formdata, setFormData] = useState({
    heading: '',
    description: '',
    code: '',
    tagInput: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formdata, [name]: value });
  };

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSnippetCreated = () => {
    setRefreshTrigger((prev) => !prev); 
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  try {

    const users = JSON.parse(localStorage.getItem("users")) || [];

 
    const userIndex = users.findIndex((u) => u.id === id.id);
    if (userIndex === -1) {
      toast.error("User not found!");
      return;
    }

 
    const newSnippet = {
      _id: uuid(),
      heading: formdata.heading,
      description: formdata.description,
      code: formdata.code,
      tags: formdata.tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    users[userIndex].snippets = users[userIndex].snippets || [];
    users[userIndex].snippets.push(newSnippet);

   
    localStorage.setItem("users", JSON.stringify(users));

    setFormData({
      heading: "",
      description: "",
      code: "",
      tagInput: "",
    });

    handleSnippetCreated();
    toast.success("Snippet saved successfully!");
  } catch (error) {
    console.error("Error saving snippet:", error);
    toast.error("Error saving snippet!");
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

export default Mainpage;
