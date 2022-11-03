
const EveSearchResult = ({ event }) => {
    return (
      <div className="search-single">
        <div>
        <h3>
        {event.title}   
        </h3>
        <p>
        Location: {event.location}  
        Time: {event.start_date} - {event.end_date}
        </p>
        </div>
        <div className="search-type-button-wrapper"><button className="search-type-button">Event</button></div>
  
      </div>
    );
  };
  
  export default EveSearchResult;