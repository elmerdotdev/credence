import ActiveClients from './components/ActiveClients'
// import PositionType from './components/PositionType'

const Reports = () => {


    return (
        <div className="reports">
            <h1><i className="icon-reports"></i>Reports</h1>
            <div className="active-clients">
                <ActiveClients />
            </div>
            {/* <div className="Position Type">
                <PositionType />
            </div> */}
        </div>
    )
}

export default Reports