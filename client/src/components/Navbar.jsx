import React from 'react'
import { assets } from '../assets/assets.js'

import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <Link to="/">
                <img src={assets.logo} alt="logo" className='h-8' />
            </Link>
        </div>
    )
}

export default Navbar
