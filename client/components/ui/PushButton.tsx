import React from "react";
import Link from "next/link";

interface Props {
  buttonText: string;
  textColor: string;
  backgroundColor: string;
  shadowColor: string;
  fontSize?: number;
  threeDValue?: number;
  paddingTb?: number;
  paddingLr?: number;
  marginTb?: number;
  marginLr?: number;
  link?: string;
}

// credits to csslab.app

const PushButton: React.FC<Props> = ({
  buttonText,
  textColor,
  backgroundColor,
  shadowColor,
  fontSize = 1,
  threeDValue = 4,
  paddingLr = 20,
  paddingTb = 10,
  marginTb = 0,
  marginLr = 0,
  link = "",
}) => {
  return (
    <>
      <Link href={link}>
        <button>{buttonText}</button>
      </Link>

      <style jsx>{`
        button {
          box-shadow: 0 ${threeDValue}px ${shadowColor};
          color: ${textColor};
          background-color: ${backgroundColor};
          text-transform: uppercase;
          padding: ${paddingTb}px ${paddingLr}px;
          border-radius: 5px;
          transition: all 0.2s ease;
          font-weight: 900;
          cursor: pointer;
          letter-spacing: 1px;
          border: none;
          font-size: ${fontSize}rem;
          margin: ${marginTb}px ${marginLr}px;
        }

        button:active {
          box-shadow: 0 1px ${shadowColor};
          transform: translateY(3px);
        }
      `}</style>
    </>
  );
};

export default PushButton;
