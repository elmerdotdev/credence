import React, { useEffect, useState } from 'react'

const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        document.body.classList.toggle('mobile-menu-visible', isMenuOpen)
    } , [isMenuOpen])

    return (
        <div className="burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default MobileMenu