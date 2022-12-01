
const EmailSearchResult = ({ email }) => {
    // console.log(onToggleNote)
      return (
        <div className="search-single" >
          <div >
          <h3>
          {email.subject}{' '}
          </h3>
          <p>{email.snippet}</p>
          </div>
          <div className="search-type-button-wrapper"><button className="search-type-button">Email</button></div>
    
        </div>
      );
    };
    
    export default EmailSearchResult;