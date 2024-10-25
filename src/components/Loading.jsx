import { useEffect, useState } from "react";
import styles from "./Loading.module.css";
import PropTypes from "prop-types";

const Loading = ({ style }) => {
  const [text, setText] = useState("Loading");

  const list = ["Loading", "Loading.", "Loading..", "Loading..."];
  useEffect(() => {
    let curr = 1;

    const intervalId = setInterval(() => {
      if (curr !== list.length) {
        setText(list[curr]);
        curr++;
      }
    }, 600);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.loading} style={style}>
      <p>{text}</p>
      <div className={styles.loader}></div>
    </div>
  );
};

Loading.propTypes = {
  style: PropTypes.object,
};

export default Loading;