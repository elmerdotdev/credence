import React, { useEffect } from 'react'

const Pricing = () => {
  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('no-sidebar')
  }, [])

  return (
    <div className="page-pricing">Pricing</div>
  )
}

export default Pricing