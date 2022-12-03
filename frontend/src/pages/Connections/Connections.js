
import React from 'react';
import { useState, useEffect } from 'react';
import AddConnection from './components/AddConnection';
import Modal from 'react-modal';
import ClientCards from './components/ClientCards';
import ConnectionDetail from './components/ConnectionDetail';
import EditConnection from './components/EditConnection';
import Filter from './components/Filter'
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
import Notification from '../../components/Notification/Notification'



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
  const [notificationSuccess, setNotificationSuccess] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [connectionTitle, setConnectionTitle] = useState('All Connections')
  

  const userID = JSON.parse(localStorage.getItem('user'))._id
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getConnections = async () => {
      const res = await fetchConnections();
      setConnections(res.sort((a, b) => a.firstname.localeCompare(b.firstname)))
    };

    getConnections() 
    let params = (new URL(document.location)).searchParams;
    if (params.toString().length > 0) {
      updateConnectionDataState(params.get("connectionId"))
      setCurrParams(params.toString())
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
  setShowDetailModal(false);
  openNotification('Connection updated', true)
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
  openNotification('Connection added', true)
};

 // Delete Connection
 const deleteConnection = async () => {
  const id = connection._id
  await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${id}`, {
    method: 'DELETE',
  });
  openNotification('Connection deleted', true)
  setConnections(connections.filter((connection) => connection._id !== id));
  setShowDetailModal(false)
};

//delete all notes when user delete client
const deleteNote = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${userID}`)
  const data = await res.json()
  
  const myNotes = data.filter((note)=> note.client_id === connection._id)

  myNotes.map(async (myNote) => {
    const id = myNote._id;
    await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, {
      method: 'DELETE',
    });
  })
}

//delete client name from activity array in Event when user delete client
const deleteNameFromEvent = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${userID}`)
  const data = await res.json()
  data.map(async (nameEvent) => {
    const nameList = nameEvent.client_id

    for (let i = 0; 0 < nameList.length; i++){
      if(nameList[i].value === connection._id && nameList.length === 1){
        await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${nameEvent._id}`,{
          method: 'DELETE',
        })
        // console.log('deleted activity')
      }else if(nameList[i].value === connection._id){
        const nameArray = []
        nameList.filter((oneName) => oneName.value === connection._id ? null: nameArray.push(oneName)); 
          
        const editCientName = async (client_id) => {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${nameEvent._id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({client_id})
          });
            await res.json()
        }
        editCientName(nameArray)
        // console.log('deleted only this client name')
      }
    }
  })
}

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
  setConnectionTitle("Pinned Connections")
}
  
  else {
    const res = await fetchConnections();
    setConnections(res);
    setPinFilterStatus(false)
    setConnectionTitle("All Connections")
  }
}

// Time Filter
const timeFilter = async () => {
  const res = await fetchConnections();
  setConnections(res.sort(({ updateAt: a }, {updateAt: b }) => a > b ? 1 : a < b ? -1 : 0))
  setConnectionTitle("Most Recent Connections")
}

const TimeReverseFilter = async() => {
  const res = await fetchConnections();
  setConnections(res.sort(({ updateAt: a }, {updateAt: b }) => a > b ? -1 : a < b ? 1 : 0))
  setConnectionTitle("Least Interacted Connections")
}

// all Connections
const allConnections = async  () => {
  const res = await fetchConnections();
    setPinFilterStatus(false)
    setConnections(res.sort((a, b) => a.firstname.localeCompare(b.firstname)))
    setConnectionTitle("All Connections")
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

// gmail integration
const gmailIntegration =  async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/gmailauth/${userID}`);

} 

// gmail update
const gmailUpdate =  async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/gmails/${userID}`);
  console.log('gmail updated')
  openNotification('Your gmail has been updated to the latest', true)

} 

// Open notification
const openNotification = (message, success) => {
  setNotificationSuccess(success)
  setNotificationMessage(message)
  setNotificationOpen(true)
}

  return (

    <div className="clients-wrapper">
      <section className="connections-top-buttons">
        <div className="connections-filter-buttons">
          <Filter onPinFilter={pinFilter} onTimeFilter={timeFilter} onTimeReverseFilter={TimeReverseFilter} onAllFilter={allConnections} gmailUpdate={gmailUpdate} />
        </div>
      </section>
      <section className="page-connections" >
      <h2>{connectionTitle}</h2>
      <ModalComponent
        className="credence-modal modal-connection-detail"
        isOpen={showDetailModal}
        onRequestClose={() => setShowDetailModal(false)}
        closeTimeoutMS={500}
      > 
        <ConnectionDetail 
        connection={connection} 
        onEditBtn={() => {setShowEditModal(true)}} 
        onDeleteBtn={() => {deleteConnection() ;deleteNote(); deleteNameFromEvent()}}  
        changeActiveBtn={handleActiveCheckbox}
        onPinBtn={pinConnection}
        onClose={() => {setShowDetailModal(); navigate(`/connections`)}}
        openNotification={openNotification}
        gmailIntegration={gmailIntegration}
        gmailUpdate={gmailUpdate}
        />    
      </ModalComponent>

      <ModalComponent
        className="credence-modal modal-connection-edit"
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        closeTimeoutMS={500}
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
        closeTimeoutMS={500}
      >
        <AddConnection 
        onAdd={addConnection}
        onClose={setShowAddModalIsOpen}
        openNotification={openNotification}
        />
      </Modal>
      {connections.length > 0 ? (
        <ClientCards
        connections={connections} onToggle = {() => updateConnectionDataState}
        />
        ) : (
          <p className="error-message">
            <button className="btn btn-primary" onClick={() => setShowAddModalIsOpen(true)}>Add Your First Connection</button>
          </p>
        )}
        </section>

        {notificationOpen && 
          <Notification success={notificationSuccess} message={notificationMessage} onClose={() => setNotificationOpen(false)} />
        }
  </div>

  )
}

export default Connections