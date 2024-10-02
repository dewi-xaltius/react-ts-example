import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for user data
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data using Axios in useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Conditional rendering based on loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
