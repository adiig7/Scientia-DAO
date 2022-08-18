import React, { useEffect, useState } from "react";
import styles from "../../styles/Loading.module.css";
import styled from "styled-components";
import { useRouter } from "next/router";

const Screen = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  opacity: 0;
  animation: fade 0.4s ease-in forwards;
  background: black;

  @keyframes fade {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Balls = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .ball {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #1b5299;
    margin: 0 6px 0 0;
    animation: oscillate 0.7s ease-in forwards infinite;
  }

  .one {
    animation-delay: 0.5s;
  }
  .two {
    animation-delay: 1s;
  }
  .three {
    animation-delay: 2s;
  }

  @keyframes oscillate {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    //   const handleStart = (url) => url !== router.asPath && setLoading(true);
    //   const handleComplete = (url) =>
    // url === router.asPath &&
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    //   router.events.on("routeChangeStart", handleStart);
    //   router.events.on("routeChangeComplete", handleComplete);
    //   router.events.on("routeChangeError", handleComplete);

    //   return () => {
    //     router.events.off("routeChangeStart", handleStart);
    //     router.events.off("routeChangeComplete", handleComplete);
    //     router.events.off("routeChangeError", handleComplete);
    //   };


    // router.events.on;
    // // routeChangeStart
    // // routeChangeComplete
    // // routeChangeError
  });

  return (
    loading && (
      // <div className={styles.spinnerWrapper}>
      //   <div className={styles.spinner}></div>
      // </div>
      <Screen>
        <Balls>
          <div className="ball one"></div>
          <div className="ball two"></div>
          <div className="ball three"></div>
        </Balls>
      </Screen>
    )
  );
}

// export default function Loading(props) {
//   return (
//     <>
//       <Screen>
//       <Balls>
//         <div className="ball one"></div>
//         <div className="ball two"></div>
//         <div className="ball three"></div>
//       </Balls>
//     </Screen>
//     </>
//   );
// }
