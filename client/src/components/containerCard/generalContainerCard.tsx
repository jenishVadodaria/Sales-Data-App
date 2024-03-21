import LoadingCube from "../loadingCube/LoadingCube";
import styles from "./ContainerCard.module.scss";

const GeneralContainerCard = ({
  children,
  isLoading = true,
  title,
  actionComponent,
  className,
}: any) => (
  <div className={`${styles.card2} ${className}`}>
    {isLoading ? (
      <div className={styles.loadingContainer}>
        <LoadingCube hasBackground={false} height="30px" width="30px" />
      </div>
    ) : (
      <>{children}</>
    )}
  </div>
);

export default GeneralContainerCard;
