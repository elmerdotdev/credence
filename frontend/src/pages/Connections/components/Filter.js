

const FilterConnections = ({onPinFilter}) => {
    return (
       
        <div className="connections-filter-btns">
            <button className="btn btn-primary-reverse" onClick={onPinFilter} >Pinned</button>
            <button className="btn btn-primary-reverse" >Most Recent</button>
            <button className="btn btn-primary-reverse" >Latest Interacted</button>
        </div>

    )
}

export default FilterConnections
