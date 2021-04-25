import React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      <nav>
        <img src={"/logo.png"} alt="Logo" />
        <h1>spaghetti tools</h1>
      </nav>

      <style jsx>{`
        nav {
          padding: 5px;
          height: 60px;
          border: 1px solid red;
          display: flex;
        }
      `}</style>
    </>
  );
};

export default Navbar;
