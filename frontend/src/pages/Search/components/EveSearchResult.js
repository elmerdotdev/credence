import moment from 'moment'

const EveSearchResult = ({ event }) => {
    return (
      <div className="search-single">
        <div>
        <h3>
        {event.title}   
        </h3>
        <p className="search-single-grey-text">Location: {event.location}  </p>
        <p className="search-single-grey-text">Time: {moment(event.start_date).format("DD") !== moment(event.end_date).format("DD") ? (
                                    <div className="viewEventDates">
                                        <span>{moment(event.start_date).format("DD MMM YYYY, hh:mm a")}</span>
                                        <span>{moment(event.end_date).format("DD MMM YYYY, hh:mm a")}</span>
                                    </div>
                                ) : (
                                    <span>{moment(event.start_date).format("DD MMM YYYY, hh:mm a")} - {moment(event.end_date).format("hh:mm a")}</span>
                                )}
        </p>
        </div>
        <div className="search-type-button-wrapper"><button className="search-type-button">Event</button></div>
  
      </div>
    );
  };
  
  export default EveSearchResult;