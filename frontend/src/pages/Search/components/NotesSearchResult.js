
const NotesSearchResult = ({ note, onToggleNote }) => {
  // console.log(onToggleNote)
    return (
      <div className="search-single" onClick = {() => onToggleNote(note._id, note.client_id)}>
        <div >
        <h3>
        {note.title}{' '}
        </h3>
        <p>{note.content}</p>
        </div>
        <div className="search-type-button-wrapper"><button className="search-type-button">Note</button></div>
  
      </div>
    );
  };
  
  export default NotesSearchResult;