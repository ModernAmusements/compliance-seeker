// components/Terminal.tsx
"use client";
import React, { FC, useState } from "react";

const Terminal: FC = () => {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleTest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/test-server-location?url=${url}`
      );
      const result = await response.json();
      setResults(JSON.stringify(result, null, 2));
    } catch (error) {
      setResults(JSON.stringify({ error: (error as Error).message }, null, 2));
    }
    setLoading(false);
  };

  const isValidUrl = url && url.startsWith("http"); // Simple validation for URL

  return (
    <div className="terminal bg-gray-800 p-4 rounded-lg">
      <div className="terminal-header bg-gray-700 p-2 rounded-t-lg flex items-center justify-between">
        <span className="text-white">Compliance Seeker</span>
      </div>
      <div className="terminal-content bg-gray-800 p-2 rounded-b-lg">
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          className={`w-full p-2 mb-2 rounded border ${
            isValidUrl ? "border-green-500" : "border-red-500"
          } bg-gray-800`} // Border color feedback
          placeholder="Enter website URL"
        />
        {isValidUrl &&
          !loading && ( // Only show button if URL is valid and not loading
            <button
              onClick={handleTest}
              className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700"
            >
              Start Test
            </button>
          )}
        {loading && <div className="loader mt-2"></div>}
        {results && (
          <pre className="bg-gray-700 p-4 mt-4 rounded">{results}</pre>
        )}
      </div>
    </div>
  );
};

export default Terminal;
