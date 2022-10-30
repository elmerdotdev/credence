import React, { useEffect } from 'react'

const Features = () => {
  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('no-sidebar')
  }, [])

  return (
    <div className="page-features">Features</div>
  )
}

export default Features