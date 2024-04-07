// import von Hooks aus react 
import { useState, useEffect } from "react";
// import von Componenten aus bootstrap
import { Button, Form } from "react-bootstrap";

//import icon
import { BsPersonPlus } from 'react-icons/bs';

//import context configuration for react-icons to style them
import { IconContext } from "react-icons";



/**
 * @see ParentComponent.js
 * Function to create a new user. It uses a form from react-bootstrap to provide a fields for the user details.
 * It takes in an employees array and a setEmployees function as props, maintains its own state for the new user,
 * and calls the setEmployees function with the new user when the "Add Employee" button is clicked.
 * 
 * @function CreateUser - creates a new user
 * 
 * receives the following props from ParentComponent.js:
 * @param employees - from ParentComponent.js
 * @function setEmployees - from ParentComponent.js
*/

const CreateUser = ({ employees, setEmployees}) => {
    
    //set the state for each input fields
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [email, setEmail] = useState ("");
    const [abteilung, setAbteilung] = useState("");
    const [address, setAddress] = useState("");
    const [geburtstag, setGeburtstag] = useState("");

    //function to handle the submit event    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {id:Math.floor(100000 + Math.random() * 900000), vorname, nachname, email, abteilung, address, geburtstag};
        setEmployees(prevEmployees => [...prevEmployees, newEmployee]);

        //empty the input fields
        setVorname("");
        setNachname("");
        setEmail("");
        setAbteilung("");
        setAddress("");
        setGeburtstag("");
        
     }

    //useEffect to save the employees array in the local storage
    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees))
    }, [employees]); // Add employees as a dependency


    return (
        <Form style={{
                width: "100%", 
                margin: "auto",
            }} 
            onSubmit={handleSubmit} 
            data-bs-theme="dark"
            className="mt-2"
            >

            <Form.Group className="m-1">
                <Form.Control
                size="lg"
                type="text"
                placeholder="Vorname *"
                value={vorname}
                onChange={e => setVorname(e.target.value)}
                required
                />
            </Form.Group>

            <Form.Group className="m-1">
                <Form.Control
                size="lg" 
                type="text"
                placeholder="Nachname *"
                value={nachname}
                onChange={e => setNachname(e.target.value)}
                required
                />
            </Form.Group>

            <Form.Group className="m-1">
                <Form.Control
                size="lg"
                type="email"
                placeholder="Email *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                
                />
            </Form.Group>

            <Form.Group className="m-1">
                <Form.Select 
                aria-label="Abteilung" 
                onChange={e => setAbteilung(e.target.value)} 
                size="lg"
                >
                    <option>Abteilung</option>
                    <option value="DEV">DEV</option>
                    <option value="Sales">Sales</option>
                    <option value="Pre-Sales">Pre-Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>                
                </Form.Select>
            </Form.Group>
          

            <Form.Group className="m-1">
                <Form.Control
                size="lg"
                type="text"
                placeholder="Adresse *"
                value={address}
                onChange={e => {
                    setAddress(e.target.value);
                }}
                required
                />
            </Form.Group>

            <Form.Group className="m-1">
                <Form.Control
                size="lg"
                type="date"
                placeholder="Geburtstag "
                value={geburtstag}
                onChange={e => setGeburtstag(e.target.value)}
                />
            </Form.Group>

            <Button variant="info" type="submit" className="m-1" size="lg">
                <IconContext.Provider value={{ className: "react-icons" }}>
                    <BsPersonPlus />
                </IconContext.Provider>
                Add Employee
            </Button>
        </Form>
    )
}

export default CreateUser;