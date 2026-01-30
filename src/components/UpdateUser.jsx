import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData();
    console.log(user);

    const handleUpdateUser = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser);

        fetch(`http://localhost:3000/users/${user._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log("after update", data)
                if(data.modifiedCount){
                    alert('User updated successfully');
                }
            });

        }

        return (
            <div>
                <form onSubmit={handleUpdateUser}>
                    <input type="text" name="name" defaultValue={user.name} />
                    <br />
                    <input type="email" name="email" defaultValue={user.email} />
                    <br />
                    <input type="submit" value="Update User" />
                </form>

            </div>
        );
    };

    export default UpdateUser;