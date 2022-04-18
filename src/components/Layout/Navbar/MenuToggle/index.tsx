import styles from "./MenuToggle.module.scss";
interface Props {
  toggleClick: () => void;
}
function MenuToggle({ toggleClick }: Props) {
  return (
    <div className={styles.MenuToggleContainer}>
      <div onClick={toggleClick} className={styles.MenuToggle}>
        <div className={styles.HamburgerButton}></div>
        <div className={styles.HamburgerButton}></div>
        <div className={styles.HamburgerButton}></div>
      </div>
    </div>
  );
}

export default MenuToggle;
