import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)
const IndustryType = () => {
    const [technology, setTechnology] = useState('')
    const [hospitality, setHospitality] = useState('')
    const [finance, setFinance] = useState('')
    const [retail, setRetail] = useState('')
    const [artAndDesign, setArtAndDesign] = useState('')
    const [manufacturing, setManufacturing] = useState('')
    const [media, setMedia] = useState('')


    useEffect(() => {
      const getClients = async () => {
          const clients = await fetchClients();
          const tech = clients.filter((client) => client.labels.filter((label) => label.text === 'Technology' && label.select === true))
          console.log(tech);
          // console.log(clients)
      }

      getClients();
  }, [])

    const fetchClients = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/63645e4850049bfd1e89637a`)
      const data = await response.json()

      if (response.ok) {
          return data
      }
  }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      };
      
      const labels = ['Technology', 'Hospitality', 'Finance', 'Retail', 'Art & Design', 'Manufacturing', 'Media'];
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [5,5,2,7,1,10,9,3,11],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

    return (
        <div>
            <h3>Industries Represented</h3>
            <div><Bar data={data} options={options}/></div>

        </div>

    )
}

export default IndustryType