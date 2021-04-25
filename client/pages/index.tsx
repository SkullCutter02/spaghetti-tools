import React from "react";

import PushButton from "../components/ui/PushButton";
import useWindowWidth from "../hooks/useWindowWidth";

const HomePage: React.FC = () => {
  const SPAN_BUTTON_COLOR = "#4196b4";

  const width = useWindowWidth();
  console.log(width);

  return (
    <>
      <main>
        <div className="hero">
          <h1>
            Write your research essays <span>with ease</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam iure maxime tenetur. Alias
            doloremque esse libero non repellat saepe ut vero. Expedita labore odit sed voluptatibus! Commodi
            dignissimos illum labore.
          </p>
          <div className="buttons">
            <PushButton
              buttonText={"Get Started"}
              backgroundColor={SPAN_BUTTON_COLOR}
              textColor={"#ecf5f8"}
              shadowColor={"#23657d"}
              fontSize={width > 500 ? 0.9 : 0.8}
              paddingTb={width > 500 ? 15 : 10}
              paddingLr={width > 500 ? 25 : 20}
              threeDValue={width > 500 ? 5 : 4}
              marginLr={width > 500 ? 30 : 15}
            />
            <PushButton
              buttonText={"Log In"}
              backgroundColor={"#319795"}
              textColor={"#ebefef"}
              shadowColor={"#126a68"}
              fontSize={width > 500 ? 0.9 : 0.8}
              paddingTb={width > 500 ? 15 : 10}
              paddingLr={width > 500 ? 25 : 20}
              threeDValue={width > 500 ? 5 : 4}
              marginLr={width > 500 ? 30 : 15}
              link={"/auth/login"}
            />
          </div>
        </div>

        <style jsx>{`
          main {
            height: calc(100vh - 50px);
            min-height: 600px;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .hero {
            width: 55%;
            min-width: 750px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            font-size: 16px;
          }

          .hero > h1 {
            font-size: 3.7em;
            text-align: center;
            line-height: 1.2em;
            color: #2d3748;
            font-weight: 900;
          }

          .hero > h1 > span {
            color: ${SPAN_BUTTON_COLOR};
          }

          .hero > p {
            text-align: center;
            line-height: 2em;
            color: #78879b;
            width: 75%;
            margin: 30px auto;
            font-weight: 300;
            font-size: 1.05em;
          }

          .buttons {
            margin-top: 15px;
            display: flex;
            justify-content: center;
          }

          @media screen and (max-width: 700px) {
            .hero {
              min-width: 550px;
              font-size: 14px;
            }
          }

          @media screen and (max-width: 600px) {
            .hero {
              min-width: 0;
              width: 90%;
              font-size: 13.5px;
              padding: 0;
            }

            .hero > h1 {
              font-size: 3.2em;
            }
          }
        `}</style>
      </main>
    </>
  );
};

export default HomePage;
