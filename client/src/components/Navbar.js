import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

import { InputGroup, FormControl } from 'react-bootstrap';

//import icons
import { BsSearch } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';

/**
 * @see App.js
 * 
 * Receives the following props from ParentComponent.js to to handle the search event:
 * @function onSearchChange - from ParentComponent.js
 * 
 * Sets navbar and creates a search bar.  
 * @returns a navbar bar with search function and links to the other components
 */

function CreateNavbar({ onSearchChange  }) {
    return (        
        <Navbar data-bs-theme="dark" className="bg-body-tertiary d-flex justify-content-evenly" fixed="top">
            <Navbar.Brand>
                <FaRobot /> PerVer
            </Navbar.Brand>
            <Nav>
                <Link to="/create-user" className="nav-element">Mitarbeiter hinzufügen</Link>
                <Link to="/user-list" className="nav-element">Mitarbeiter Liste</Link>
            </Nav>

            <Form> 
            <Form.Group>
                <InputGroup>
                    <InputGroup.Text>
                        <BsSearch />
                    </InputGroup.Text>
                    <FormControl 
                    placeholder="Suche..."
                    onChange={onSearchChange} 
                    />
                </InputGroup>
            </Form.Group>
            </Form>        
        </Navbar>
    );
}

export default CreateNavbar;