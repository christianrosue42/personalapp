import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsSave } from 'react-icons/bs';

import { IconContext } from "react-icons";


/**
 * @see UserList.js
 * 
 * Function to edit a user. It uses a modal from react-bootstrap to provide a form for the user details.
 * It takes in a user object and an onSave function as props, maintains its own state for the edited user,
 * and calls the onSave function with the edited user when the "Save Changes" button is clicked.
 *  
 * receives the following props from UserList.js:
 * @property user - from UserList.js
 * @property show - from UserList.js
 * @function onSave - from UserList.js
 * @function setShow - from UserList.js
 * 
 *  
 * @returns a modal with a form to edit the user details
 */

function EditUser({ user, onSave, setShow, show }) {
  //set the state for the user to be edited
  const [editedUser, setEditedUser] = useState({ ...user });

  //function to save the changes and close the modal
  const handleSave = () => {
    onSave(editedUser);
    setShow(false);
  };

  //function to handle the changes in the form and set the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <>
      <Modal data-bs-theme="dark" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Bearbeiten</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Form>
            <Form.Group>
              <Form.Label>Vorname</Form.Label>
              <Form.Control
                type="text"
                name="vorname"
                value={editedUser.vorname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nachname</Form.Label>
              <Form.Control
                type="text"
                name="nachname"
                value={editedUser.nachname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Abteilung</Form.Label>
              <Form.Control
                type="text"
                name="abteilung"
                value={editedUser.abteilung}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editedUser.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Geburtstag</Form.Label>
              <Form.Control
                type="text"
                name="geburtstag"
                value={editedUser.geburtstag}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light">
          <Button variant="outline-info" onClick={handleSave}>
          <IconContext.Provider value={{ className: "react-icons" }}>
            <BsSave />
          </IconContext.Provider>
            Speichern
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;
