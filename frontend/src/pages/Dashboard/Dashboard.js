import React, { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('dashboard')
  }, [])

  return (
    <section className="page-dashboard">Dashboard</section>
  )
}

export default Dashboard