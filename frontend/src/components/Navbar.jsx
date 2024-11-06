import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-primary p-4 h-16 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary-content">Todo App</h1>
      <div>
        <button className="btn btn-sm btn-warning rounded-sm mr-2">Profile</button>
        <button className="btn btn-sm btn-error rounded-sm">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar
