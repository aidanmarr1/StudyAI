import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the App Router's home page
    window.location.href = '/';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Loading...
        </h1>
      </div>
    </div>
  );
} 