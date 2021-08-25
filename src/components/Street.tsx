import iconS from "../assets/019-s.svg";

interface Props {
    id: number;
    text: string;
    top: number;
    left: number;
    zoom: boolean;
    rotation: string;
    onClick: any;
}

const Street: React.FC<Props> = (props) => {
    return (
        <div
          key={props.id}
          style={{
            fontSize: props.zoom ? "1.2rem" : "0.8rem",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            position: "absolute",
            top: props.top,
            left: props.left,
            transform: `translate(-50%, -50%) rotate(${props.rotation})`,
            cursor: "pointer",
          }}
          onClick={props.onClick}
        >
          {props.text === "" ? (
            <img src={iconS} style={{ height: "1.5rem" }} alt="street" />
          ) : (
            props.text
          )}
        </div>
      )
}

export default Street