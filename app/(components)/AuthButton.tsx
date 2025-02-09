// components/AuthButton.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="relative inline-block">
      {/* User Icon */}
      <button
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        {isLoggedIn ? (
          // Profile Icon (User Logged In)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          // Default User Icon (User Logged Out)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
        <div className="py-1">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Log In
              </Link>
              <Link href="/signup" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}