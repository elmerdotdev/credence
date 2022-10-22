import { useState, useEffect } from 'react';


const ConnectionDetail = ({connection}) => {

  useEffect(() => {
    console.log(connection);

  }, []);


  return (
    <div>
      <div>
        <h3>
        {connection && connection.firstname}{' '}
        {connection && connection.lastname}{' '}
        </h3>
        <div>
        <h5>Position</h5>
        <p>{connection && connection.position}</p>
        </div>
        <div>
        <h5>Organization</h5>
        <p>{connection && connection.company}</p>
        </div>
        <div>
        <h5>Email</h5>
        <p>{connection && connection.email}</p>
        </div>
      </div>
  </div>
    )
};


export default ConnectionDetail;