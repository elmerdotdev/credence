

const FilterConnections = ({onPinFilter, onTimeFilter, onAllFilter, gmailUpdate}) => {
    return (
       
        <div className="connections-filter-btns">
             <button className="btn btn-primary-reverse" onClick={onAllFilter} >All</button>
            <button className="btn btn-primary-reverse" onClick={onPinFilter} >Pinned</button>
            <button className="btn btn-primary-reverse" onClick={onTimeFilter}>Most Recent</button>
            <button className="btn btn-primary-reverse" >Least Interacted</button>
            <button className="btn btn-primary-reverse"onClick={gmailUpdate}>Update Gmail</button>
        </div>

    )
}

export default FilterConnections
