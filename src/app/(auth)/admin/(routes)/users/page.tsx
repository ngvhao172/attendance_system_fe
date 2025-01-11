import React from 'react';

import { UsersList } from './components/UserList';

const page = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User List</h1>
      <UsersList />
    </div>
  );
};

export default page;
