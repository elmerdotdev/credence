// 显示所有clients
// 用modal打开添加client表格
// insert一个新的client进database

import React from 'react';
import { useState, useEffect } from 'react';
import ClientCard from './ClientCard';
import Modal from './Modal';

const Connections = () => {

  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const getConnections = async () => {
      const res = await fetchConnections();
      setConnections(res);
    };

    getConnections();
  }, []);

// Fetch Connections
const fetchConnections = async () => {
  const res = await fetch('http://localhost:5002/api/clients/633e29fe0f75b027fc7434e8');
  const data = await res.json();
  return data;
};

// Add Connection
const addConnection = async (newClient) => {
  const res = await fetch('http://localhost:5002/api/clients', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newClient),
  });

  const data = await res.json();
  setConnections([...connections, data]);
};

const deleteConnection = async () => {

  const res = await fetch('http://localhost:5002/api/clients/6348a9d86a8ff1e1f8253d67', {
    method: 'DELETE'
  });

  // const data = await res.json();
};

const modal_styles = {
  position:'relative',
  zIndex:1
}

const background_styles ={
  position:'relative',
  zIndex:2,
}

const[openModal,setOpenModal] = useState(false)

  return (
    <div className="page-connections-background">
      <section className="page-connections " style={background_styles}>Connections</section>
      <button className="openModalBtn" onClick={() => setOpenModal(true)}>Add New Client</button>
      <button onClick = {deleteConnection}>del</button>
    {openModal && <Modal closeModal={setOpenModal}/>}
    {connections && connections.map((connection)=> (
     <ClientCard key={connection._id} connection={connection}/>
    ))}
    </div>
  )
}


export default Connections