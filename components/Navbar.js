import React from 'react'
import {MenuItems} from "./MenuItems.js"
import Button from "./Button.js"
import Scroll from 'react-scroll'
const ScrollLink = Scroll.ScrollLink

const NavBar = ({isHomePage}) => {

  return (
    <>
    <nav className="NavbarItems">
        <div>
          <img src="/static/images/logov2.png" className="logo-header navbar-logo"></img>
        </div>
        {isHomePage ? <ul className='nav-menu'>
            {MenuItems.map((item, idx) =>
                <li key={idx}>
                  <button className={item.cName} onClick={() => document.querySelector(`#${item.id}`).scrollIntoView({ behavior: 'smooth', block: 'center' })}>
                    {item.title}
                  </button>
                </li>
            )
          }
        </ul> : <></>}
    </nav>
    </>
  )
}

export default NavBar
