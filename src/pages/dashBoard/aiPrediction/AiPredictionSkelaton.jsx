import React from "react";

// Custom icons to match the original design
const WheatIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12h20" />
    <path d="M6 8l4 4 4-4" />
    <path d="M6 16l4-4 4 4" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
    <polyline points="16,7 22,7 22,13" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SkeletonCard = () => (
  <div className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 p-4">
    <div className="animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square w-full mb-4 rounded-lg bg-gray-200 dark:bg-gray-800"></div>

      {/* Prediction skeleton */}
      <div className="text-center mb-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 mx-auto"></div>
      </div>

      {/* Confidence skeleton */}
      <div className="text-center mb-3">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-12 mx-auto"></div>
      </div>

      {/* Date skeleton */}
      <div className="text-center">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20 mx-auto"></div>
      </div>
    </div>
  </div>
);

const StatCardSkeleton = ({ icon }) => (
  <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
    <div className="animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
        </div>
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-600">{icon}</div>
        </div>
      </div>
    </div>
  </div>
);

const SmartSiloSkeleton = () => {
  // Generate 8 skeleton cards
  const skeletonCards = Array(8).fill(null);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black transition-colors duration-300">
      {/* Header */}

      {/* Stats Cards */}
      <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCardSkeleton icon={<TrendingUpIcon />} />
          <StatCardSkeleton icon={<CheckCircleIcon />} />
          <StatCardSkeleton icon={<AlertCircleIcon />} />
          <StatCardSkeleton icon={<CalendarIcon />} />
        </div>

        {/* Data Grid */}
        <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Crops Analysis Results
            </h2>
          </div>

          <div className="grid justify-end items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {skeletonCards.map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSiloSkeleton;
