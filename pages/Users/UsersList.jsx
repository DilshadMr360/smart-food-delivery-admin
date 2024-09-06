import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css';

const UsersList = ({url}) => {
  const [users, setUsers] = useState([]); // State to store users

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        // const token = localStorage.getItem('token'); 
        const response = await axios.get(`${url}/api/user/users-list`);
  
        // Handle the response (e.g., set state with the user data)
        console.log('hellllo',response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <div className='user-list add flex-col'>
      <p>All Users list</p>
      <div className='list-table'>
        <div className="user-list-table-format title">
          {/* <b>User Id</b> */}
          <b>User Name</b>
          <b>Email</b>
          <b>Orders</b>
          <b>Action</b>
        </div>
        {users.map(users => (
          <div key={users._id} className='user-list-table-format'>
            {/* <p>{users._id}</p> */}
            <p>{users.name}</p>
            <p>{users.email}</p>
            <b>view</b>
            <div className='actions'>
              <p className='cursor'>X</p>
              <p className='cursor'>Edit</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
