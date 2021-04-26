import React from "react";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";

import { RootReducer } from "../../store/rootReducer";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootReducer) => state.user);

  return (
    <>
      <nav>
        <div className="left">
          <img src={"/logo.png"} alt="Logo" />
          <Link href={"/"}>
            <h1 className="name">spaghetti tools</h1>
          </Link>
        </div>
        <div className="right">
          {user ? (
            <>
              <FaUserAlt color={"#4e4e4e"} />
              <p>{user.username}</p>
            </>
          ) : (
            <Link href={"/auth/login"}>
              <p className="login">Login</p>
            </Link>
          )}
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
          cursor: pointer;
        }

        img {
          height: 80%;
          margin-right: 15px;
        }

        .login {
          text-decoration: underline;
          color: grey;
          cursor: pointer;
        }

        @media screen and (max-width: 600px) {
          nav .name {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
