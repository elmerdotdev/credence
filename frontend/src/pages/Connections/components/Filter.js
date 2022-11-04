

const FilterConnections = ({onPinFilter}) => {
    return (
       
        <>
        <button className="Btn" onClick={onPinFilter} >Pinned</button>
        <button className="Btn" >Most Recent</button>
       <button className="Btn" >Latest Interacted</button>
        </>

    )
}

export default FilterConnections
