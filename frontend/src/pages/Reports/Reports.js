import ActiveClients from './components/ActiveClients'
import IndustryType from './components/IndustryType'
import EventsBreakdown from './components/EventsBreakdown'

const Reports = () => {


    return (
        <div className="reports">
            <h2>Reports</h2>
            <div className="active-clients">
                <ActiveClients />
            </div>
            <div className="industry-type">
                <IndustryType />
            </div>
            <div className="events-breakdown">
                <EventsBreakdown />
            </div>
        </div>
    )
}

export default Reports