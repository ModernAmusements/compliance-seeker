// page.tsx
import React from "react";
import Terminal from "./components/Terminal";
import Navbar from "./components/Navbar"; // Import Navbar component

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar /> {/* Use Navbar component */}
      <main className="flex items-center">
        <div className="m-4 p-4 rounded-lg shadow-lg bg-gray-800 w-full max-w-lg">
          <Terminal />
        </div>
      </main>
    </div>
  );
}
