import React, { FC } from "react";
import styles from "./LoadingCube.module.scss";

export enum LoadingCubeTheme {
  LIGHT = "light",
  DARK = "dark",
}

interface LoadingCubeProps {
  isFullScreen?: boolean;
  height?: string | number;
  width?: string | number;
  theme?: LoadingCubeTheme;
  hasBackground?: boolean;
}

const LoadingCube: FC<LoadingCubeProps> = ({
  isFullScreen = false,
  height = "69px",
  width = "69px",
  theme = LoadingCubeTheme.LIGHT,
  hasBackground = true,
}) => {
  let color;
  let bg;
  if (theme === LoadingCubeTheme.LIGHT) {
    color = styles.light;
    bg = styles.loadingCubeContainer__dark;
  } else {
    color = styles.dark;
    bg = styles.loadingCubeContainer__light;
  }
  if (hasBackground === false) {
    bg = styles.loadingCubeContainer__transparent;
  }
  return (
    <div
      className={`${styles.loadingCubeContainer} ${bg} ${
        isFullScreen ? styles.fullScreen : null
      }`}>
      <div style={{ height: height, width: width }}>
        <div className={`${styles.sk_cube_grid}`}>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube1} ${color}`}></div>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube2} ${color}`}></div>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube3} ${color}`}></div>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube4} ${color}`}></div>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube5} ${color}`}></div>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube6} ${color}`}></div>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube7} ${color}`}></div>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube8} ${color}`}></div>
          <div
            className={`${styles.sk_cube} ${styles.sk_cube9} ${color}`}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCube;
