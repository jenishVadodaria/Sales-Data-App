import LoadingCube from "../loadingCube/LoadingCube";
import styles from "./ContainerCard.module.scss";

const ContainerCard = ({
  children,
  isLoading = true,
  title,
  actionComponent,
  className,
}: any) => (
  <div className={`${styles.card} ${className}`}>
    {isLoading ? (
      <div className={styles.loadingContainer}>
        <LoadingCube hasBackground={false} height="30px" width="30px" />
      </div>
    ) : (
      <>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle} key="containerCardTitle">
            {title}
          </h4>
          {actionComponent}
        </div>
        {children}
      </>
    )}
  </div>
);

export default ContainerCard;
