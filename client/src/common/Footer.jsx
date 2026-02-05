import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-dark text-white text-center py-3 bottom-0 mt-auto">
      <div className="container">
        <p className="mb-0">
          © {new Date().getFullYear()} MyStore Admin Panel. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer