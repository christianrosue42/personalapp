import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

//import react router components
import { useLocation } from 'react-router-dom';


/**
 * @see UserList.js
 * @see CreateUser.js
 * 
 * This component is the parent component of the main section of the website. It maintains the state of the employees object
 * and passes the data to the child components.
 * 
 * Handles routing with the useLocation Hook from react-router-dom.
 * 
 * Receives the following props from App.js:
 * @property searchString - from App.js
 * 
 * 
 * 
 * Passes the following props to CreateUser.js:
 * @property employees - to CreateUser.js
 * @function setEmployees - to CreateUser.js
 * 
 * Passes the following props to UserList.js:
 * @property filteredUsers - to UserList.js
 * @function deleteUser - deletes a user with a confirmation dialog and id as parameter
 * @function handleSave - saves the data in state when the save button is clicked
 *  
 * Uses Effect Hook to save the data in the localStorage
 * 
 */

function ParentComponent({ searchString }) {
    //useLocation Hook to get the current path
    const location = useLocation();
    
    //set the state for the employees object and get the data from the localStorage or set an empty array
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem("employees") || "[]"));

    /** 
     * filter the users by the search string and save them in a new array filteredUsers.
     * the search string is compared to the user details with the includes() method
     * the toLowerCase() method is used to make the search case insensitive
     * the filteredUsers array is passed to the UserList component
    */

    const filteredUsers = employees.filter(user =>
        user.id.toString().includes(searchString) ||
        user.vorname.toLowerCase().includes(searchString.toLowerCase()) ||
        user.nachname.toLowerCase().includes(searchString.toLowerCase()) ||
        user.email.toLowerCase().includes(searchString.toLowerCase()) ||
        user.abteilung.toLowerCase().includes(searchString.toLowerCase()) ||
        user.address.toLowerCase().includes(searchString.toLowerCase()) ||
        user.geburtstag.toLowerCase().includes(searchString.toLowerCase())
    );

    //function to save the data in state when the save button is clicked
    const handleSave = (editedUser) => {
        setEmployees(employees.map(user => user.id === editedUser.id ? editedUser : user));
    };

    //function to delete a user with a confirmation dialog and id as parameter
    const deleteUser = (userId) => {
        setEmployees(employees.filter(user => user.id !== userId));
    };

    //useEffect Hook to save the data in the localStorage
    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    //return the CreateUser and UserList components depending on the current path
    return (
        <div>            
            { location.pathname === '/create-user' && <CreateUser employees={employees} setEmployees={setEmployees} />}
            { location.pathname === '/user-list' && <UserList employees={filteredUsers} onDeleteUser={deleteUser} onSave={handleSave}/> }   
        </div>
    );
}

export default ParentComponent;