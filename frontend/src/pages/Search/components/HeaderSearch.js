import React, { useState, useEffect } from 'react'
import SearchResults from './SearchResults';

const HeaderSearch = () => {
    const [ keyword, setKeyword ]= useState('');
    const [connections, setConnections] = useState([]);
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [searchParams] = useState(["firstname", "lastname", "position"]);
    useEffect(() => {
        const getConnections = async () => {
            const res = await fetchConnections();
            setConnections(res);
          };
      
          getConnections();
        }, []);
    // Fetch Connections
    const fetchConnections = async () => {
        const res = await fetch('https://credence-server.onrender.com/api/clients/633b6a81145c9d79405c54ea');
        const data = await res.json();
        return data;
    };

    const search = (queryStr) => {
        console.log(connections)
        console.log(queryStr)

        if (queryStr === "") {
            setFilteredConnections([]);
        }else{
            const filtered = connections.filter((item) => {
                return searchParams.some((searchParam) => {
                    return (
                        item[searchParam]
                            .toString()
                            .toLowerCase()
                            .indexOf(queryStr.toLowerCase()) > -1
                    );
                });
        });
        setFilteredConnections(filtered);}
    }
    return (
        <div className="header-search-qa">
            <form className="header-search-form">
                <input id="header-search-input" type="text" placeholder="Search" value={keyword} onChange={e => {setKeyword(e.target.value); search(e.target.value)}} />
                <button type="submit">
                    <i className="icon-search"></i>
                </button>
            </form>
          
            <SearchResults filteredConnections={filteredConnections} />
 
            <button className="header-quick-add">
                <span>Quick Add</span>
                <i className="icon-plus"></i>
            </button>
        </div>
    )
}

export default HeaderSearch