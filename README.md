import React from "react";

const CodeEditor = ({ handlesubmit, handlechange, formData }) => {
  return (
    <div className="flex flex-col bg-black w-full min-h-screen p-6 text-white">
      <form
        onSubmit={handlesubmit}
        className="flex flex-col gap-4 h-full  rounded-xl p-4 shadow-lg"
      >
        {/* Top Inputs */}
        <div className="flex flex-wrap gap-4 w-full">
          <input
            type="text"
            name="heading"
            value={formData.heading}
            required
            onChange={handlechange}
            className="flex-1 bg-black text-gray-100 border border-gray-700 rounded-lg p-3 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-900 transition-all"
            placeholder="Snippet Title"
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handlechange}
            required
            className="flex-[2] bg-black text-gray-100 border border-gray-700 rounded-lg p-3 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-900 transition-all"
            placeholder="Short Description"
          />

          <input
            type="text"
            name="tagInput"
            value={formData.tagInput}
            onChange={handlechange}
            required
            className="flex-1 bg-black text-gray-100 border border-gray-700 rounded-lg p-3 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-900 transition-all"
            placeholder="Tags (comma separated)"
          />

          <button
            type="submit"
            className="bg-gray-900 border border-gray-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
          >
            💾 Save Snippet
          </button>
        </div>

        {/* Code Editor Area */}
        <textarea
          name="code"
          value={formData.code}
          onChange={handlechange}
          className="flex-grow bg-black text-gray-100 border border-gray-800 rounded-lg p-4 font-mono text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-900 resize-none"
          placeholder="Write your code here..."
          required
        />
      </form>
    </div>
  );
};

export default CodeEditor;