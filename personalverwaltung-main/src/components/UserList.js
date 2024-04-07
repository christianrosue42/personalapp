import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

//import own components
import UserCard from "./UserCard";


/**
 * Gets a list of employees from the state in ParentComponent.js
 * Creates a list of UserCard components and displays them by iterating through the employees array
 * passes the data from the employees array to the UserCard component
 * 
 * receives the following props from ParentComponent.js:
 * @param employees - aus ParentComponent.js
 * @param onDeleteUser - aus ParentComponent.js
 * 
 * Passes the following props to UserCard.js:
 * @property id - an UserCard.js
 * @property vorname - an UserCard.js
 * @property nachname - an UserCard.js
 * @property email - an UserCard.js
 * @property abteilung - an UserCard.js
 * @property address - an UserCard.js
 * @property geburtstag - an UserCard.js
 * 
 * passes the following functions to UserCard.js:
 * @function onDeleteUser - an UserCard.js
 * @function onSave - an UserCard.js
 * 
 * function to create a list of UserCard components
 * @function employeesList - creates a list of UserCard components
 * 
 * @see ParentComponent.js
 * @see UserCard.js
 * 
 */
function UserList({ employees, onDeleteUser, onSave }) {    

    const employeesList = employees.map((user, i) => {
        return (
            <Col key={i} className="d-flex justify-content-center m-2">
                <UserCard 
                    onDeleteUser={onDeleteUser}
                    onSave={onSave} 
                    id={user.id} 
                    vorname={user.vorname} 
                    nachname={user.nachname} 
                    email={user.email} 
                    abteilung={user.abteilung} 
                    address={user.address} 
                    geburtstag={user.geburtstag}/>
            </Col>          
        );        
    });

    return (         
        <Container className="d-flex justify-content-center align-items-center">
            <Row className="justify-content-md-center">
                {employeesList}
            </Row>
        </Container>        
    );
}

export default UserList;