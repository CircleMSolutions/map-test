import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { searchStreets, StreetInfo } from "../street_list";
import styles from "./Dialog.module.css";

interface Props {
  onCancel: () => void;
  id: number;
  title?: string;
  type: "block" | "street";
  value: string;
  onConfirm: (id: number, value: string) => void;
}

const Dialog: React.FC<Props> = (props) => {
  const [value, setValue] = useState(props.value);
  const [autocomplete, setAutocomplete] = useState<StreetInfo[]>([])
  const portal = document.getElementById("dialog-portal");

  useEffect(() => {
    setAutocomplete(searchStreets(''))
  }, [])

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
        <form onSubmit={props.onConfirm.bind(null, props.id, value)}>
          <div className={styles["dialog-body"]}>
            <input
              className={props.type === "block" ? styles["block-input"] : styles["street-input"]}
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                if (props.type === "street") {
                  setAutocomplete(searchStreets(e.target.value))
                }
              }}
            />
            <div className={props.type === "street" ? styles["autocomplete"] : undefined}>
              <ul>
                {props.type === "street" && autocomplete.map(streetItem => (
                  <li style={{cursor: 'pointer'}} onClick={() => {
                    setValue(streetItem.street)
                  }}>{streetItem.street}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles["dialog-action"]}>
            <button
              style={{ background: "gray" }}
              type="button"
              onClick={props.onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => props.onConfirm.bind(null, props.id, value)}
            >
              Ok
            </button>
          </div>
        </form>
      </div>
    </div>,
    portal
  );
};

export default Dialog;
