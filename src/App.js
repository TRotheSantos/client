import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './App.css';


function App() {
    const [users, setUsers] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [company, setCompany] = useState('');


    
    useEffect(() => {
      fetch(`http://localhost:5000/users?limit=${pageSize}&offset=${pageIndex}`)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.log(error));
    }, [pageSize, pageIndex]);
  
    const handlePageSizeChange = (event) => {
      setPageSize(parseInt(event.target.value));
      setPageIndex(0); // reset page index when page size changes
    };
  
    const handlePageChange = (event, value) => {
      setPageIndex(value - 1);
    };

    // adding
    const handleSubmit = event => {
      event.preventDefault(); // no reloading of page
      // creating new user with input data
      const newUser = {
        first: firstName,
        last: lastName,
        email: email,
        country: country,
        company: company
      };
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(response => response.json()) //-- gives error! because response already in json
        .then(newUser => {
          setUsers([...users, newUser]);
          setFirstName('');
          setLastName('');
          setEmail('');
          setCountry('');
          setCompany('');
        })
        .catch(error => {
          console.log(error)
          alert('An error occurred while adding the user. Please try again later.');
        }); 
    };
    

  
    return (
      <div className="container">
        <h2>Add User</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label>First Name:</label>
      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
    </div>
    <div>
      <label>Last Name:</label>
      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
    </div>
    <div>
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
    </div>
    <div>
      <label>Country:</label>
      <input type="text" value={country} onChange={e => setCountry(e.target.value)} />
    </div>
    <div>
      <label>Company:</label>
      <input type="text" value={company} onChange={e => setCompany(e.target.value)} />
    </div>
    <button type="submit">Add User</button>
  </form>
        <h1 className="title">User List</h1>
        <div className="controls">
          <label htmlFor="page-size">Show:</label>
          <select id="page-size" value={pageSize} onChange={handlePageSizeChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
            <option value="10000">10000 (slow)</option>
          </select>
        </div>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id}>
              <div className="user">
                <div className="user-info">
                  <div className="user-name">{user.first} {user.last}</div>
                  <div className="user-email">{user.email}</div>
                  <div className="country">{user.country}</div>
                  <div className="user-company">{user.company}</div>
                </div>
                <div className="created">{new Date(user.created_at).toLocaleDateString()}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <Pagination
            count={Math.ceil(users.length / pageSize)}
            page={pageIndex + 1}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </div>
        <div>
  
</div>

      </div>
    );
    
  }

  export default App;