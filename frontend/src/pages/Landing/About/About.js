import React, { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('no-sidebar')
  }, [])

  return (
    <div className="page-about">About</div>
  )
}

export default About