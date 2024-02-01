import React from 'react'
import "../styles/navbar.css"
import {Link} from "react-router-dom"
function Navbar() {
  return (
    <div className='navbar'>
        <h2 className="logo">
            Plagiarism Checker
        </h2>
        <div className="links">
            <Link to="/" className="link">Home</Link>
            <Link to="/about" className="link">About</Link>
        </div>
    </div>
  )
}

export default Navbar