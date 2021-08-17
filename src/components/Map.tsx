import { useState } from "react";
import map from "../assets/map.png";

interface Props {}

const MapComp: React.FC<Props> = (props) => {
  const [zoom, setZoom] = useState(true);

  const zoomHandler = () => {
    setZoom((prev) => !prev);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={zoom ? { height: "100%" } : {}}
        onClick={zoomHandler}
        src={map}
        alt=""
      />
    </div>
  );
};

export default MapComp;
