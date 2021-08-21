import { createPortal } from "react-dom"
import styles from "./Dialog.module.css"

interface Props {
    onCancel: () => void
    id?: number
}

const Dialog: React.FC<Props> = (props) => {
    const portal = document.getElementById('dialog-portal')
    if (!portal) return <></>
    return createPortal(
        <div onClick={props.onCancel} className={styles["dialog-container"]}>
            <div onClick={(e) => {e.stopPropagation()}} className={styles.dialog}>
                <div className={styles["dialog-header"]}>Title</div>
                <div className={styles["dialog-body"]}>                {props.id}
</div>
                <div className={styles["dialog-action"]}>
                <button type="button" onClick={() => {console.log("sasd")}}>Ok</button>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                </div>
                
                </div>
        </div>,
        portal
    )
}

export default Dialog