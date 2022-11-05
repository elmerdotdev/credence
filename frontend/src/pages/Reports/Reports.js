import ActiveClients from './components/ActiveClients'
import IndustryType from './components/IndustryType'

const Reports = () => {


    return (
        <div className="reports">
            <h2><i className="icon-reports"></i>Reports</h2>
            <div className="active-clients">
                <ActiveClients />
            </div>
            <div className="industry-type">
                <IndustryType />
            </div>
        </div>
    )
}

export default Reports