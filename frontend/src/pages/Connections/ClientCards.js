import ClientCard from './ClientCard'

const ClientCards = ({ connections, onToggle }) => {
    return (
       
        <>
        {connections.map((connection) => (
            <ClientCard key={connection._id} connection={connection} onToggle={onToggle(connection._id)} />
        ))}
        </>

    )
}

export default ClientCards