import React, { useState, useEffect } from 'react'

const HeaderSearch = () => {
    const [ keyword, setKeyword ]= useState('');

    return (
        <div className="header-search-qa">
            <form className="header-search-form">
                <input id="header-search-input" type="text" placeholder="Search" value={keyword} onChange={e => setKeyword(e.target.value)} />
                <button type="submit">
                    <i className="icon-search"></i>
                </button>
            </form>

            <button className="header-quick-add">
                <span>Quick Add</span>
                <i className="icon-plus"></i>
            </button>
        </div>
    )
}

export default HeaderSearch