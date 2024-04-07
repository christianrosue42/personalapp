import React from 'react';
import { useState } from 'react';

import Image from 'react-bootstrap/Image';

//import own css sytles
import '../App.css';

//import React Bootstrap components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//import React Bootsrap icons
import { BsTrash3, BsEnvelopeAt, BsCalendar2Heart, BsGeo, BsGear, BsPerson } from 'react-icons/bs';

//import context configuration for react-icons to style them
import { IconContext } from "react-icons";

//import own components
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

/**
 * @see UserList.js
 * 
 * Function to display a user card with the user details. It uses a card from react-bootstrap to show the user details.
 * It takes in a user object and an onDeleteUser function as props, maintains its own state for the edited user,
 * and calls the onDeleteUser function with the user id when the "Delete" button is clicked.
 * 
 * receives the following props from UserList.js:
 * @property id - from UserList.js
 * @property vorname - from UserList.js
 * @property nachname - from UserList.js
 * @property email - from UserList.js
 * @property abteilung - from UserList.js
 * @property address - from UserList.js
 * @property geburtstag - from UserList.js
 * 
 * @function onDeleteUser - from UserList.js
 * @function onSave - from UserList.js
 * 
 * Passes the following props to EditUser.js:
 * @property user - to EditUser.js
 * @property show - to EditUser.js
 * 
 * @function onSave - to EditUser.js
 * @function setShow - to EditUser.js
 * 
 * Passes the following props to DeleteUser.js:
 * @property id - to DeleteUser.js
 * @property vorname - to DeleteUser.js
 * @property nachname - to DeleteUser.js
 * @property show - to DeleteUser.js
 * 
 * @function setDeleteShow - to DeleteUser.js
 * @function onDeleteUser - to DeleteUser.js
 *   
 */

function UserCard({ id, vorname, nachname, email, abteilung, address, geburtstag, onDeleteUser, onSave}) {
  //set the state for the edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  //set the state for the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //create a user object with the data from the props
  const user = { id, vorname, nachname, email, abteilung, address, geburtstag };

  return (
        
      <Card style={{ width: '18rem', height: '' }} className='card-hover bg-dark d-flex align-items-center mt-2'>
        <Image variant="top" src={`https://robohash.org/${email}?set=set3`} roundedCircle className='bg-secondary m-3'style={{ width: '60%' }} />
        <Card.Body className='bg-dark text-light' style={{ width: '100%' }}>
          <Card.Title>{vorname + ' ' + nachname}</Card.Title>
          <Card.Subtitle className="mb-2">Abteilung: {abteilung}</Card.Subtitle>

          <div className='d-flex align-items-start flex-column'>
          <Card.Text>
            <IconContext.Provider value={{ className: "react-icons" }}>
              <BsPerson />
            </IconContext.Provider>
            {id}
          </Card.Text>    
          
          <Card.Text>
            <IconContext.Provider value={{ className: "react-icons" }}>
              <BsEnvelopeAt />
            </IconContext.Provider>
            <a className= 'text-info' href={`mailto:${email}`}>{email}</a>
          </Card.Text>
          
          <Card.Text>
            <IconContext.Provider value={{ className: "react-icons" }}>
              <BsGeo />
            </IconContext.Provider>
            {address}
          </Card.Text>        
          
          <Card.Text>
            <IconContext.Provider value={{ className: "react-icons" }}>
              <BsCalendar2Heart /> 
            </IconContext.Provider>
            {geburtstag}
          </Card.Text>
          
          </div>

          <div className='d-flex justify-content-between mt-3'>
          <Button variant="outline-light" size='sm' className='' onClick={() => setShowEditModal(true)}>
            <IconContext.Provider value={{ className: "react-icons" }}>
              <BsGear />
            </IconContext.Provider>
            Bearbeiten
          </Button>

          <Button variant="outline-warning" size='sm' onClick={() => setShowDeleteModal(id)} >
            <IconContext.Provider value={{ className: "react-icons" }}>
              <BsTrash3 />
            </IconContext.Provider>
            Löschen
          </Button>
          </div>
        </Card.Body>

        {showEditModal && (
        <EditUser
          user={user}
          show={showEditModal}
          setShow={setShowEditModal}
          onSave={(editedUser) => {
            onSave(editedUser);
            setShowEditModal(false);
          }}
        />
        )}

        {showDeleteModal && (
          <DeleteUser 
            id={id}
            vorname={vorname}
            nachname={nachname}
            show={showDeleteModal}
            setDeleteShow={setShowDeleteModal}
            onDeleteUser={(id) =>{
              onDeleteUser(id);
              setShowDeleteModal(false)
            }}    
          />
        )}

      </Card>      
  );
}

export default UserCard;