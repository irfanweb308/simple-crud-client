import { use, useState } from "react";



const Users = ({ userPromise }) => {

  const initialUsers = use(userPromise);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log("data after creating user in db", data);
        if (data.insertedId) {
          user._id = data.insertedId;
          const newUsers = [...users, user];
          setUsers(newUsers);
          alert('User added successfully');
          event.target.reset();
        }
      })


  }

  const handleDeleteUser = id => {
    console.log("deleting user with id:", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log("after delete", data);
      })
  }
  return (
    <div>
      <div>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" />
          <br />
          <input type="email" name="email" />
          <br />
          <input type="submit" value="Add User" />
        </form>
      </div>
      <div>
        {
          users.map(user => <p key={user._id}>{user.name} : {user.email} <button onClick={() => handleDeleteUser(user._id)}>X</button></p>)
        }
      </div>
    </div>
  )
}

export default Users