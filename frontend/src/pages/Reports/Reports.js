import ActiveClients from './components/ActiveClients'
import IndustryType from './components/IndustryType'
import EventsBreakdown from './components/EventsBreakdown'
import MostInteracted from './components/MostInteracted'

const Reports = () => {


    return (
        <div className="reports">
            <h2>Reports</h2>
            <div className="reports-wrapper">
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
        </div>
    )
}

export default Reports