import React, { useState, useEffect } from 'react';
import './AdminUserList.css';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersResponse = await fetch("http://localhost:8081/user/get-all", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const respondData = await usersResponse.json();

      if (respondData && respondData.length > 0) {
        console.log("Data came about user");

        setUsers(respondData);
      } else {
        console.log("Use mock data if the response is empty")
      }
    } catch (err) {
      setError('Failed to fetch users data. Please try again later.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false); 
    }
  };


  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.name || '').toLowerCase().includes(searchLower) ||
      (user.email || '').toLowerCase().includes(searchLower) ||
      (user.phone || '').includes(searchTerm) ||
      (user.address || '').toLowerCase().includes(searchLower)
    );
  });


  // Handle column sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort users based on current sort configuration
  const sortedUsers = React.useMemo(() => {
    const sortableUsers = [...filteredUsers];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  // Get sorting indicator for table headers
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  // Handle user deletion
  const handleDeleteUser =async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try{
        const deleteUser = await fetch(`http://localhost:8081/user/delete-by-id/${userId}`,{
          method : "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data=await deleteUser;
        if(data.ok){
          alert("Delete Successfully")
        }
      }
      catch{}
    }
  };

  // Handle view user details
  const handleViewUserDetails = (userId) => {
    // In a real application, this would navigate to a user details page
    // For example: history.push(`/admin/users/${userId}`);
    alert(`Viewing details for user ID: ${userId}`);
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">User Management</h1>

      <div className="admin-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <button className="refresh-button" onClick={fetchUsers}>
          Refresh Data
        </button>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('id')}>
                ID {getSortDirectionIndicator('id')}
              </th>
              <th onClick={() => requestSort('name')}>
                Name {getSortDirectionIndicator('name')}
              </th>
              <th onClick={() => requestSort('email')}>
                Email {getSortDirectionIndicator('email')}
              </th>
              <th onClick={() => requestSort('phone')}>
                Phone Number {getSortDirectionIndicator('phone')}
              </th>
              <th onClick={() => requestSort('address')}>
                Address {getSortDirectionIndicator('address')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map(user => (

                <tr key={user.userID}>
                  <td>{user.userID}</td>
                  <td>{user.userName}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.userNumber}</td>
                  <td>{user.userAddress}</td>
                  <td className="action-buttons">
                    <button
                      className="view-button"
                      onClick={() => handleViewUserDetails(user.userID)}
                    >
                      View
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteUser(user.userID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">No users found matching your search criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-footer">
        <p>Total Users: {users.length} | Showing: {sortedUsers.length}</p>
      </div>
    </div>
  );
}