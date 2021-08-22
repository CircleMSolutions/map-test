import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";

interface Props {
  onCancel: () => void;
  id?: number;
  title?: string;
}

const Dialog: React.FC<Props> = (props) => {
  const [value, setValue] = useState("");
  const portal = document.getElementById("dialog-portal");

  if (!portal) return <></>;

  return createPortal(
    <div onClick={props.onCancel} className={styles["dialog-container"]}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.dialog}
      >
        <div className={styles["dialog-header"]}>
          <h2>{props.title}</h2>
        </div>
        <div className={styles["dialog-body"]}>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        <div className={styles["dialog-action"]}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("sasd");
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>,
    portal
  );
};

export default Dialog;
