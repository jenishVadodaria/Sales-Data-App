import React, { Suspense, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "./Dashboard.module.scss";
import LoadingCube from "../../components/loadingCube/LoadingCube";
import TabComponent from "../../components/tabs/tabComponent";

export const Dashboard: React.FC = () => {
  const { logout, user } = useAuthContext();
  // console.log(user, "user");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  //   useEffect(() => {
  //     const fetchWorkouts = async () => {
  //       try {
  //         const response = await axios.get('/api/workouts', {
  //           headers: { Authorization: `Bearer ${authState.user?.token}` },
  //         });
  //         dispatch({ type: 'SET_WORKOUTS', payload: response.data });
  //       } catch (error) {
  //         console.error('Error fetching workouts:', error);
  //       }
  //     };

  //     if (authState.user) {
  //       fetchWorkouts();
  //     }
  //   }, [dispatch, authState.user]);

  // return <button onClick={handleLogout}>Logout</button>;

  return (
    // <div className={styles.dashboard}>
    //   {/* Fixed Menu w/ artimis (quick files), search and quick notes */}
    //   {/* <div className={styles.topMenu}> */}
    //   {/* <TopMenu showSearch={true} /> */}
    //   {/* <>Top Menu</> */}
    //   {/* </div> */}
    //   {/* Left Menu */}
    //   {/* <div className={styles.leftMenu}> */}
    //   {/* <MainNavigation /> */}
    //   {/* <>Navigation</> */}
    //   {/* <Filters /> */}
    //   {/* </div> */}
    //   <div>
    //     <Suspense
    //       fallback={
    //         <LoadingCube isFullScreen={true} height="200px" width="200px" />
    //       }
    //     >
    //       <div className={styles.scrollComponent}>
    //         <TabComponent />
    //       </div>
    //     </Suspense>
    //   </div>
    // </div>
    <Suspense
      fallback={
        <LoadingCube isFullScreen={true} height="200px" width="200px" />
      }
    >
      {/* <div className={styles.scrollComponent}> */}
      <div>
        <TabComponent />
      </div>
    </Suspense>
  );
};
