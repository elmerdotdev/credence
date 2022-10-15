// insert一个新的client进database
import React from 'react';
import { useState, useEffect } from 'react';
import ClientCards from './ClientCards';
import Modal from './Modal';

const Connections = () => {

  const [connections, setConnections] = useState([]);
  const [showAddConnection, setShowAddConnection] = useState(false);

  useEffect(() => {
    const getConnections = async () => {
      const res = await fetchConnections();
      setConnections(res);
    };

    getConnections ();
  }, []);

// Fetch Connections
const fetchConnections = async () => {
  const res = await fetch('http://localhost:5002/api/clients');
  const data = await res.json();
  console.log(setShowAddConnection);

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
  // const addClient = async (task) => {

  const res = await fetch('http://localhost:5002/api/clients/6348a9d86a8ff1e1f8253d67', {
    method: 'DELETE'
  });

  // const data = await res.json();
};

// const addClient = async (newClient) => {
  
//   const res = await fetch('http://localhost:5002/api/clients', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(newClient),
//   });

//   const data = await res.json();
// };
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
    <div>
      <section className="page-connections" style={background_styles}>Connections</section>
      {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}> Fancy Modal </Modal>  */}
        <button className="openModalBtn" onClick={() => setOpenModal(true)}>Add New Client</button>
      {/* <ClientCards />
      <button onClick = {deleteConnection}>del</button> */}
    {openModal && <Modal closeModal={setOpenModal}/>}
    </div>
  )
}


export default Connections