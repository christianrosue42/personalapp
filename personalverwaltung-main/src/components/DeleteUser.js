import { Button, Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsTrash3 } from "react-icons/bs";

/**
 * Helper component to delete a user from the list
 * It is called from UserCard.js when the delete button is clicked
 * 
 * Receives the following props from UserCard.js:
 * @param id - from UserCard.js
 * @param vorname - from UserCard.js
 * @param nachname - from UserCard.js
 * @function onDeleteUser - from UserList.js
 * @function show - from UserList.js
 * @function setDeleteShow - from UserList.js 
 * @returns 
 */

function DeleteUser({ id, vorname, nachname, onDeleteUser, show, setDeleteShow }) {
    // Call the onDeleteUser function passed as a prop
    const handleDelete = () => {
        onDeleteUser(id)
        setDeleteShow(false)
       }      
    
        return (
            <>
                <Modal data-bs-theme="dark" show={show} onHide={() => setDeleteShow(false)}>
                    <Modal.Header closeButton className="bg-dark text-light">Löschbestätigung</Modal.Header>                
                    <Modal.Body className="bg-dark text-light">
                    <Modal.Title>Wollen Sie den Mitarbeiter <b className="info">{vorname} {nachname}</b> mit der ID: <b className="info">{id}</b> wirklich löschen?</Modal.Title>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark text-light">
                        <Button variant="outline-warning" onClick={() => handleDelete(id)}>
                            <IconContext.Provider value={{ className: "react-icons" }}>
                                <BsTrash3 />
                            </IconContext.Provider>
                            Löschen
                        </Button>
                        <Button onClick={() =>setDeleteShow(false) } variant="secondary">Abbrechen</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    } 

export default DeleteUser;