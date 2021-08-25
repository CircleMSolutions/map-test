interface Props {
    id: number;
    top: number;
    left: number;
    zoom: boolean;
    icon: string;
    onClick: any
}

const Hydrants: React.FC<Props> = (props) => {
    return (
        <div
          key={props.id}
          onClick={props.onClick}
          style={{
            position: "absolute",
            top: props.top,
            left: props.left,
            height: "1rem",
            width: "1rem",
            borderRadius: "0.5rem",
            background: "red",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        ><img style={{height: props.zoom ? '1.3rem' : '1rem'}} src={props.icon} alt="" /></div>
      )
}

export default Hydrants