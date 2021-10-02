import styles from "./p.module.css";

const Paragraph = () => (
  <p className={styles.p}>
    Rotate cam: Left click
    <br />
    Pan cam: Right click
    <br />
    Zoom: Mouse wheel
  </p>
);
export default Paragraph;
