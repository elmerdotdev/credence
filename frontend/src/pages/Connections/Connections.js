// 【✅】显示所有clients
// 【✅】用modal打开添加client表格 用cancel button关闭表格
// 【✅】insert一个新的client进database
// 【✅】client card只显示姓名/title/organization
// 【✅】点开每个client显示详情，包括姓名/title/organization/email/phone
//  将active status改成可以one click更改状态的button加入ui
//  新增connection表格中加入industry，且显示在ui
// 【✅】在client details中用modal增加edit client功能
// 【✅】edit button打开edit function modal
// 【✅】edit function
//  delete funtion
//  将pin button改成one click更改状态

import React from 'react';
import { useState, useEffect } from 'react';
import AddConnection from './components/AddConnection';
// import Modal from './Modal';
import Modal from 'react-modal';
import ClientCards from './components/ClientCards';
import ConnectionDetail from './components/ConnectionDetail';
import EditConnection from './components/EditConnection';
import Filter from './components/Filter'

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
  const [showAddModalIsOpen, setShowAddModalIsOpen] = useState(false);
  const [useConnectionDetailsModal, setConnectionDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
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
  setShowDetailModal(true);
};

const editConnection = async (inputConnObj) => {
  const connectionToEditId = connection._id;
  const getConnectionRes = await fetch(`https://credence-server.onrender.com/api/clients/633b6a81145c9d79405c54ea/${connectionToEditId}`)

 
  setShowEditModal(true)
  const connectionToEdit = await getConnectionRes.json()
  const updConnection = {
    ...inputConnObj,

  };
  updConnection.user_id = connection.user_id;


  await fetch(`https://credence-server.onrender.com/api/clients/${connectionToEditId}`, {

    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updConnection),
  });

  const res = await fetchConnections();
  setConnections(res);
  console.log('finish edit')
};

// Fetch Connections
const fetchConnections = async () => {
  const res = await fetch('https://credence-server.onrender.com/api/clients/633b6a81145c9d79405c54ea');
  const data = await res.json();
  return data;
};

// Fetch Connection
const fetchConnection = async (id) => {
  const res = await fetch(`https://credence-server.onrender.com/api/clients/633b6a81145c9d79405c54ea/${id}`);
  const data = await res.json();
  return data;
};

// Add Connection
const addConnection = async (newClient) => {
  const res = await fetch('https://credence-server.onrender.com/api/clients', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newClient),
  });
  
  const data = await res.json();
  setConnections([...connections, data]);
  setShowAddModalIsOpen(false);
  alert('Connection has been added');
};

 // Delete Connection
 const deleteConnection = async () => {
  const id = connection._id
  await fetch(`https://credence-server.onrender.com/api/clients/${id}`, {
    method: 'DELETE',
  });
  alert('Connection has been deleted')
  setConnections(connections.filter((connection) => connection._id !== id));
  setShowDetailModal(false)
};

// Pin Connection
const pinConnection = async () => {
  const id = connection._id
  const ConnectiontoPin = await fetch(`https://credence-server.onrender.com/api/clients/633b6a81145c9d79405c54ea/${id}`)
  const updConnection = { ...ConnectiontoPin, pinned: true };

  await fetch(`https://credence-server.onrender.com/api/clients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updConnection),
  });

};

// Pin Filter
const pinFilter = () => {
    // if state boolean true or false:
    setConnections(
    connections.filter((connection) => {if (connection.pinned) {return connection}})
    )
  const new_list = connections.filter((connection) => {if (connection.pinned) {return connection}})
  console.log(new_list)
  // else: fetch connections and set connections
}

  return (

    <div className="clients">
      <section className="page-connections" >
      <h2>All Connections</h2>
      <p><button className="openModalBtn" onClick={() => setShowAddModalIsOpen(true)}>Add</button></p>
      <Filter onPinFilter={pinFilter}/>
      <ModalComponent
        isOpen={showDetailModal}
        onRequestClose={() => setShowDetailModal(false)}
      >
        <button onClick={() => setShowDetailModal(false)}>X</button>
      
        
        <ConnectionDetail 
        connection={connection} onEditBtn={() => {setShowEditModal(true)}} onDeleteBtn={deleteConnection}
        onPinBtn={pinConnection}
        />
       
      </ModalComponent>
      <ModalComponent
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        <button onClick = {() => setShowEditModal(false)}>X</button>
        <EditConnection 
        connection={connection}
        onEdit={editConnection}
        />
       
      </ModalComponent>

      <Modal
        isOpen={showAddModalIsOpen}
        onRequestClose={() => setShowAddModalIsOpen(false)}
      >
         <button onClick={() => setShowAddModalIsOpen(false)}>X</button>
        <AddConnection 
        onAdd= {addConnection}  
        />     
        <button onClick = {() => setShowAddModalIsOpen(false)}>Cancel</button> 
      </Modal>
      {connections.length > 0 ? (<ClientCards
        connections={connections}  onToggle = {() => updateConnectionDataState}
        />
        ) : (
          <p className="error-message">
            <button>Add a new connection</button>
          </p>
        )}
        </section>
  </div>

  )
}


export default Connections