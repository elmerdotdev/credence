import React, { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('no-sidebar')
  }, [])

  return (
    <div className="page-home">Home</div>
  )
}

export default Home