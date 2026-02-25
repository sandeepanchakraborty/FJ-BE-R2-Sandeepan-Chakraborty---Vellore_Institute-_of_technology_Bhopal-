import React from "react";

export const Separator = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-800"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white rounded dark:bg-black/10 text-gray-500">
          Or
        </span>
      </div>
    </div>
  );
};
