

const FilterConnections = ({onPinFilter}) => {
    return (
       
        <>
        <button className="btn btn-primary-reverse" onClick={onPinFilter} >Pinned</button>
        <button className="btn btn-primary-reverse" >Most Recent</button>
        <button className="btn btn-primary-reverse" >Latest Interacted</button>
        </>

    )
}

export default FilterConnections
