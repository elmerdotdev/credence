// 显示所有clients
// 用modal打开添加client表格 用cancel button关闭表格
// insert一个新的client进database

import React from 'react';
import { useState, useEffect } from 'react';
import ClientCard from './ClientCard';
import AddConnection from './AddConnection';
// import Modal from './Modal';
import Modal from 'react-modal'

 //Modal Style
 const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%',
  },
};


const Connections = () => {

  const [connections, setConnections] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;

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

//Open Modal
const openModal = () => {
  setIsOpen(true)
}

//Modal Style 
const viewModal = () => {
  subtitle.style.color = '#f00';
}

//Close Modal 
const closeModal = () => {
  setIsOpen(false);
}

// Add Connection
// const addConnection = async (newClient) => {
//   const res = await fetch('http://localhost:5002/api/clients', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(newClient),
//   });

//   const data = await res.json();
//   setConnections([...connections, data]);
// };

// const deleteConnection = async () => {

//   const res = await fetch('http://localhost:5002/api/clients/6348a9d86a8ff1e1f8253d67', {
//     method: 'DELETE'
//   });

// };

// const[openModal,setOpenModal] = useState(false)

  return (

    <div className="clients">
      <section className="page-connections " >Connections</section>
      <button className="openModalBtn" onClick={openModal}>Add New Client</button>
      {connections && connections.map((connection)=> (
     <ClientCard key={connection._id} connection={connection}/>
    ))}

      <Modal
        isOpen={modalIsOpen}
        viewModal={viewModal} 
        closeModal={closeModal}
        style={customStyles} 
      >
        <AddConnection />
        <button onClick={closeModal}>cancel</button>
      </Modal>
  </div>
    // <div className="page-connections-background">
    //   <section className="page-connections " style={background_styles}>Connections</section>
    //   <button className="openModalBtn" onClick={() => setOpenModal(true)}>Add New Client</button>
    //   <button onClick = {deleteConnection}>del</button>
    // {openModal && <Modal closeModal={setOpenModal}/>}
    // {connections && connections.map((connection)=> (
    //  <ClientCard key={connection._id} connection={connection}/>
    // ))}
    // </div>
  )
}


export default Connections