// 【✅】显示所有clients
// 【✅】用modal打开添加client表格 用cancel button关闭表格
// 【✅】insert一个新的client进database
// 【✅】client card只显示姓名/title/organization
// 【✅】点开每个client显示详情，包括姓名/title/organization/email/phone
//  将active status改成可以one click更改状态的button加入ui
//  新增connection表格中加入industry，且显示在ui
// 【✅】在client details中用modal增加edit client功能
//  edit button打开edit function modal
//  edit function
//  delete funtion
//  将pin button改成one click更改状态

import React from 'react';
import { useState, useEffect } from 'react';
import ClientCard from './ClientCard';
import AddConnection from './AddConnection';
// import Modal from './Modal';
import Modal from 'react-modal';
import ClientCards from './ClientCards';
import ConnectionDetail from './ConnectionDetail';

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

const ConnectionDetailsModal = props => {
  const { isOpen } = props;
  // If we only put the modal in the render tree when it's open, multiple modals
  // will open in the expected order
  return isOpen ? <Modal {...props} /> : null;
};


const Connections = () => {

  const [connections, setConnections] = useState([]);
  const [connection, setConnection] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [useConnectionDetailsModal, setConnectionDetailsModal] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const ModalComponent = useConnectionDetailsModal ? ConnectionDetailsModal : Modal;
  let subtitle;

  useEffect(() => {
    const getConnections = async () => {
      const res = await fetchConnections();
      setConnections(res);
    };

    getConnections();
  }, []);

const updateConnectionDataState = async (connection_id) => {
  const connectionData = await fetchConnection(connection_id);
  setConnection(connectionData);
  console.log(connectionData);
  setShowModal2(true);
};

// Fetch Connections
const fetchConnections = async () => {
  const res = await fetch('http://localhost:5002/api/clients/633e29fe0f75b027fc7434e8');
  const data = await res.json();
  return data;
};

// Fetch Connection
const fetchConnection = async (dllm) => {
  const res = await fetch(`http://localhost:5002/api/clients/633e29fe0f75b027fc7434e8/${dllm}`);
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

 // Edit Connection
 const editConnection = async (_id) => {
  const connectionToEdit = await fetchConnection(_id);
  const updConnection = {
    ...connectionToEdit
  };

  await fetch('http://localhost:5002/api/clients/633e29fe0f75b027fc7434e8/:6350631f4a8bf2d3a539368e', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updConnection),
  });

  const res = await fetchConnections();
  setConnections(res);
};

  return (

    <div className="clients">
      <section className="page-connections " >Connections</section>
      <button className="openModalBtn" onClick={openModal}>Add New Client</button>
      <ModalComponent
        isOpen={showModal2}
        onRequestClose={() => setShowModal2(false)}
      >
        <button onClick={() => setShowModal2(false)}>X</button>
        <button>Pin</button>
        <button onClick={() => setShowModal1(true)}>Edit</button>
        <button>Delete</button>
        <ConnectionDetail connection={connection}/>
       
      </ModalComponent>
      <ModalComponent
        isOpen={showModal1}
        onRequestClose={() => setShowModal1(false)}
      >
        <div>Modal 1</div>
        <button onClick = {() => setShowModal1(false)}>Close</button>
      </ModalComponent>

      <Modal
        isOpen={modalIsOpen}
        viewModal={viewModal} 
        closeModal={closeModal}
        style={customStyles} 
      >
        <AddConnection 
        onAdd= {addConnection}  
        />     
        <button onClick={closeModal}>cancel</button> 
      </Modal>
      {connections.length > 0 ? (<ClientCards
        connections={connections}  onToggle = {() => updateConnectionDataState}
        />
        ) : (
          <p className="error-message">
            <button>Add a new connection</button>
          </p>
        )}
  </div>

  )
}


export default Connections