import React from "react";

export default function LoadingSpinner({ message = "Loading data..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[300px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-teal-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-6 text-slate-500 font-medium tracking-wide animate-pulse">{message}</p>
    </div>
  );
}
