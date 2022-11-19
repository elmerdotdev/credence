import ClientCard from './ClientCard'

const ClientCards = ({ connections, onToggle, connection }) => {


    //sort all connections
    const sortedConnections = connections.sort((a, b) => a.firstname.localeCompare(b.firstname))
    
     // Group by first letter
     let data = sortedConnections.reduce((r, e)  => {
        let group = e.firstname[0];
        if(!r[group]) r[group] = {group, groupedConn: [e]}
        else r[group].groupedConn.push(e);
        return r      
     },{})

     let result = Object.values(data)

    
   
        

    return (
       
        <div>
        {result.map((item) => (
            <div className="connection-content" >
            <h3>{item.group}</h3>
            {item.groupedConn.map((connection) => (
                <ClientCard key={connection._id} connection={connection} onToggle={onToggle(connection._id)}/> 
            )) } 
             </div>       
        ))}
        </div>


    )
}

export default ClientCards