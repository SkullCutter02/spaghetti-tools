import React from "react";
import { FaUserAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <>
      <nav>
        <div className="left">
          <img src={"/logo.png"} alt="Logo" />
          <h1 className="name">spaghetti tools</h1>
        </div>
        <div className="right">
          <FaUserAlt color={"#4e4e4e"} />
          <p>skullcutter</p>
        </div>
      </nav>

      <style jsx>{`
        nav {
          padding: 5px;
          height: 50px;
          display: flex;
          justify-content: space-between;
          box-shadow: 0 1px 10px 2px #b1b1b1;
        }

        nav .left {
          display: flex;
          align-items: center;
          margin-left: 20px;
          width: 50%;
        }

        nav .right {
          display: flex;
          align-items: center;
          margin-right: 20px;
          width: 50%;
          justify-content: flex-end;
        }

        .right p {
          margin-left: 10px;
          color: #4e4e4e;
        }

        nav .name {
          color: #4e4e4e;
          font-weight: 600;
          font-size: 1.2rem;
        }

        img {
          height: 80%;
          margin-right: 15px;
        }
      `}</style>
    </>
  );
};

export default Navbar;
