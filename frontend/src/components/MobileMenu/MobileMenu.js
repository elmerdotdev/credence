import React, { useState } from 'react'

const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuToggle = (status) => {
        setIsMenuOpen(status)

        if (isMenuOpen) {
            document.querySelector('body').classList.add('mobile-menu-visible')
        } else {
            document.querySelector('body').classList.remove('mobile-menu-visible')
        }
    }

    return (
        <div className="burger" onClick={() => menuToggle(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default MobileMenu