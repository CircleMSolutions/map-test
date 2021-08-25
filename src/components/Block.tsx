import iconB from "../assets/002-b.svg";

interface Props {
    id: number;
    text: string;
    rotation: string;
    top: number;
    left: number;
    zoom: boolean;
    onClick: any;
}

const Block: React.FC<Props> = (props) => {
    return (
        <div
          key={props.id}
          style={{
            fontSize: props.zoom ? "1.2rem" : "0.8rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            position: "absolute",
            color: "green",
            top: props.top,
            left: props.left,
            transform: `translate(-50%, -50%) rotate(${props.rotation})`,
            cursor: "pointer",
          }}
          onClick={props.onClick}
        >
          {props.text === "" ? (
            <img src={iconB} style={{ height: "1.5rem" }} alt="street" />
          ) : (
            props.text
          )}
        </div>
      )
}

export default Block