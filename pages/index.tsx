import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import CompetitionsForm from '../pages/components/CompetitionForm';
import Link from 'next/link';

function Index() {
  const { user, error, isLoading } = useUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md text-center">
        {isLoading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-600">{error.message}</div>}
        {user ? (
          <div>
            <div className="text-center text-2xl font-bold mb-4">Welcome {user.name}!</div>
            <Link href="/api/auth/logout">
              <a className="inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 mb-4">
                Logout
              </a>
            </Link>
            <CompetitionsForm user={user} />
          </div>
        ) : (
          <Link href="/api/auth/login">
            <a className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Login
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Index;

