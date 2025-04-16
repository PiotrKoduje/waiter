import styles from './Info.module.scss'

const Info = (props) => {
  return(
    <div className={styles.infoWindow}>{props.children}</div>
  );
};

export default Info;