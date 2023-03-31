import React from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1 className='nav-tit'>FitLog</h1>
            </Link>
            <div>
              <Link className="nav-sa" to="https://www.linkedin.com/in/gowtham-dharma-e-0a463a232/" target={'_blank'}>GD_Dev</Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar
