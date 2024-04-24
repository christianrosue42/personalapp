import React from "react";

//import social media icons
import { FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

//import address icons
import { FaRobot } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';


//import context configuration for react-icons to style them
import { IconContext } from "react-icons";

/**
 * Component to display the footer of the application
 * @returns the footer of the application
 */
 
function Footer() {
    return (
        <div className="bg-dark text-white p-5 footer-container">
            <div className="footer-content">
                <div>
                    <h5>PerVer - Roboverwaltung</h5>
                    <p>© 2023</p>
                </div>

                <div>
                    <h5>Social Media</h5>
                    <div className="social-icons">
                        <p>
                            <FaGithub /> 
                        </p>
                        <p>  
                            <FaInstagram />                 
                        </p>
                        <p>
                            <FaYoutube />          
                        </p>
                        <p>
                            <FaGoogle />    
                        </p>
                    </div>                                      
                </div>

                <div>
                    <h5>Impressum</h5>
                    <p>
                        <IconContext.Provider value={{ className: "react-icons" }}>
                            <FaRobot />
                        </IconContext.Provider>
                        PerVer GmbH
                    </p>

                    <p>
                        <IconContext.Provider value={{ className: "react-icons" }}>
                            <FaMapMarkerAlt />
                        </IconContext.Provider>
                        12345 Gotham City
                    </p>

                    <p>
                        <IconContext.Provider value={{ className: "react-icons" }}>
                            <FaPhone />
                        </IconContext.Provider>
                        +49 163 1737743
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Footer;