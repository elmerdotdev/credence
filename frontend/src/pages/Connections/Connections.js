
import React from 'react';
import { useState, useEffect } from 'react';
import AddConnection from './components/AddConnection';
// import Modal from './Modal';
import Modal from 'react-modal';
import ClientCards from './components/ClientCards';
import ConnectionDetail from './components/ConnectionDetail';
import EditConnection from './components/EditConnection';
import Filter from './components/Filter'
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';

 //Modal Style
 const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%',
    position: "absolute",
    top: "20px",
    left: "20%",
    right: "20%",
    bottom: "20px"
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
  const [activeChecked, setActiveChecked] = useState();
  const [pinFilterStatus, setPinFilterStatus] = useState(false);
  const [showAddModalIsOpen, setShowAddModalIsOpen] = useState(false);
  const [useConnectionDetailsModal, setConnectionDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const ModalComponent = useConnectionDetailsModal ? ConnectionDetailsModal : Modal;
  const [currParams, setCurrParams] = useState('');
  

  const userID = JSON.parse(localStorage.getItem('user'))._id
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getConnections = async () => {
      const res = await fetchConnections();
      setConnections(res);
    };

    getConnections() 
    let params = (new URL(document.location)).searchParams;
    if (params.toString().length > 0) {
      updateConnectionDataState(params.get("connectionId"))
      setCurrParams(params.toString())
      //set note id = asfdhasjfhlskj
      //set isopennote = true
    }
  }, [location])

const updateConnectionDataState = async (connection_id) => {
  const connectionData = await fetchConnection(connection_id);
  setConnection(connectionData);
  setShowDetailModal(true);
};

const editConnection = async (inputConnObj) => {
  const connectionToEditId = connection._id;
  // const getConnectionRes = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}/${connectionToEditId}`)

 
  setShowEditModal(true)
  // const connectionToEdit = await getConnectionRes.json()
  const updConnection = {
    ...inputConnObj,

  };
  updConnection.user_id = connection.user_id;


  await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${connectionToEditId}`, {

    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updConnection),
  });

  const res = await fetchConnections();
  setConnections(res);
  console.log('finish edit');
  setShowEditModal(false);
  alert('Connection has been updated');
};

// Fetch Connections
const fetchConnections = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`);
  const data = await res.json();
  return data;
};

// Fetch Connection
const fetchConnection = async (id) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}/${id}`);
  const data = await res.json();
  return data;
};

// Add Connection
const addConnection = async (newClient) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/clients`, {
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
  await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${id}`, {
    method: 'DELETE',
  });
  alert('Connection has been deleted')
  setConnections(connections.filter((connection) => connection._id !== id));
  setShowDetailModal(false)
};

// Pin Connection
const pinConnection = async (e) => {
  const id = connection._id
  const getConnectionRes = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}/${id}`)
  const ConnectiontoPin = await getConnectionRes.json()
  let updConnection = null
  if(!connection.pinned) {
  updConnection = { ...ConnectiontoPin, pinned: true };
  } else if(connection.pinned){
  updConnection = { ...ConnectiontoPin, pinned: false };
  }


await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(updConnection),
});

setConnection(updConnection)
};

// Pin Filter
const pinFilter = async () => {
    if (!pinFilterStatus) {
    setConnections(
    connections.filter((connection) => {if (connection.pinned) {return connection}})
    )
  const new_list = connections.filter((connection) => {if (connection.pinned) {return connection}})
  setPinFilterStatus(true)
}
  
  else {
    const res = await fetchConnections();
    setConnections(res);
    setPinFilterStatus(false)
  }
}

//Active Button
const handleActiveCheckbox = async (e) => { 
  const id = connection._id;
  const ConnectiontChangeActive = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}/${id}`)

  connection.active ? connection.active=false : connection.active=true;
  setConnection(connection);
  e.target.checked = connection.active;
  const updConnection = { ...ConnectiontChangeActive, active: connection.active };

  await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updConnection),
  });
  
  
}; 

  return (

    <div className="clients-wrapper">
      <section className="connections-top-buttons">
        <button className="btn btn-primary openModalBtn" onClick={() => setShowAddModalIsOpen(true)}>Add</button>
        <div className="connections-filter-buttons">
          <Filter onPinFilter={pinFilter}/>
        </div>
      </section>
      <section className="page-connections" >
      <h2>All Connections</h2>
      <ModalComponent
        className="credence-modal modal-connection-detail"
        isOpen={showDetailModal}
        onRequestClose={() => setShowDetailModal(false)}
      > 
        <ConnectionDetail 
        // isOpenNote={Boolean}
        // NoteId={id_from_state}
        connection={connection} 
        onEditBtn={() => {setShowEditModal(true)}} 
        onDeleteBtn={deleteConnection} 
        changeActiveBtn={handleActiveCheckbox}
        onPinBtn={pinConnection}
        onClose={() => {setShowDetailModal(); navigate(`/connections`)}}
        />    
      </ModalComponent>

      <ModalComponent
        className="credence-modal modal-connection-edit"
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        <EditConnection 
        connection={connection}
        onEdit={editConnection}
        onClose={setShowEditModal}
        />       
      </ModalComponent>

      <Modal
        className="credence-modal modal-connection-add"
        isOpen={showAddModalIsOpen}
        onRequestClose={() => setShowAddModalIsOpen(false)}
      >
        <AddConnection 
        onAdd={addConnection}
        onClose={setShowAddModalIsOpen}
        />
      </Modal>
      {connections.length > 0 ? (
        <div className="connection-content"><ClientCards
        connections={connections}  onToggle = {() => updateConnectionDataState}
        /></div>
        ) : (
          <p className="error-message">
            <button>Add Your First Connection</button>
          </p>
        )}
        </section>
  </div>

  )
}

export default Connections