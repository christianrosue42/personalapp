import React from "react";

//import state
import { useState } from "react";

//import react router
import { BrowserRouter as Router } from "react-router-dom";

//import own css sytles
import './App.css';

//import icons
import { FaRobot } from 'react-icons/fa';

//import components
import ParentComponent from "./components/ParentComponent";
import CreateNavbar from "./components/Navbar";
import Footer from "./components/Footer";

/**
 * Handles the display of the application
 * Sets Router and calls the main components
 * Split into header, main and footer for semantic reasons
 * 
 * @see ParentComponent.js
 * @see Navbar.js
 * @see Footer.js
 * 
 * Uses state to handle the search event in the search bar
 * 
 * Passes the following props to Navbar.js:
 * @function onSearchChange - to Navbar.js
 * 
 * Passes the following props to ParentComponent.js:
 * @property searchString - to ParentComponent.js
 *  
 * @returns the main components of the application
 */

const App = () => {

    const [searchString, setSearchString] = useState('');

    const handleSearchChange = (event) => {
    setSearchString(event.target.value);
    };
        
    return (
        <>
        <Router>
            <header >
                <CreateNavbar onSearchChange={handleSearchChange} />
            </header>

            <main>
                <div 
                className="mt-5 text-center bg-dark text-light p-3 d-flex flex-row justify-content-center" 
                style={{ width: '100%', opacity: '50%' }}
                >
                    <FaRobot style={{ width: '50px', height: 'auto' }} className="react-icons"/>    
                    <h1 className=''>PerVer - Die App für Personalverwaltung!!!!</h1>
                </div>
                <ParentComponent searchString={searchString}/>                        
            </main>

            <footer>
                <Footer />
            </footer>
        </ Router>
         
        </>                      
    );
}

export default App;