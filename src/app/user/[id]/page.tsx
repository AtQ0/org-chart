'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';

// Import React's use hook to unwrap the promise

const UserPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const searchParams = useSearchParams();

  // Unwrap the params using React.use()
  const { id } = use(params); // Use React.use() to get the 'id' from params

  const role_name = searchParams.get('role_name'); // Access 'role_name' from the query string

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>User ID: {id}</p>
      <p>Role: {role_name}</p>
    </div>
  );
};

export default UserPage;
