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
    body: JSON.stringify(updConnection),
  });

  const res = await fetchConnections();
  setConnections(res);
};

// Fetch Connections
const fetchConnections = async () => {
  const res = await fetch('https://credence-server.onrender.com/api/clients/633b6a81145c9d79405c54ea');
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