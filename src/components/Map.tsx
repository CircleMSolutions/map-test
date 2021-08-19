import { useEffect, useState } from "react";
import map from "../assets/map.png";
import { useResizeDetector } from 'react-resize-detector';

interface Props {}

function FindPosition(oElement: any) {
  if (typeof oElement.offsetParent != "undefined") {
    for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
    return [posX, posY];
  } else {
    return [oElement.x, oElement.y];
  }
}

function GetCoordinates(e: any) {
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(e.target);
  if (e.pageX || e.pageY) {
    PosX = e.pageX;
    PosY = e.pageY;
  } else if (e.clientX || e.clientY) {
    PosX =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    PosY =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];
  return { x: PosX, y: PosY };
}

const MapComp: React.FC<Props> = (props) => {
  const { width, height, ref } = useResizeDetector();
  const [zoom, setZoom] = useState(false);
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  const [pins, setPins] = useState<{ x: number; y: number }[]>([]);

  const imageClickHandler = (e: any) => {
    const { x, y } = GetCoordinates(e);
    if (e.shiftKey) {
      setPins((prev) => [
        ...prev,
        {
          x: x / width!,
          y: y / height!,
        },
      ]);
    }
    if (e.altKey) {
      scroll.x === 0
        ? setScroll({ x: x, y: e.clientY / 2 + y })
        : setScroll({ x: 0, y: 0 });
      setZoom((prev) => !prev);
    }
  };

  useEffect(() => {
    window.scroll(scroll.x, scroll.y);
    window.addEventListener('resize', () => {})
    return () => window.removeEventListener('resize', () => {})
  }, [scroll]);

  return (
    <div style={{ position: "relative", height: zoom ? "auto" : "95vh" }}>
      {pins.map((pin) => {
        const top = pin.y * height!;
        const left = pin.x * width! + ref.current?.offsetLeft;
        return (
          <div
            key={Math.random()}
            style={{
              position: "absolute",
              top,
              left,
              height: "14px",
              width: "14px",
              borderRadius: "7px",
              background: "red",
              transform: 'translateX(-7px) translateY(-7px)'
            }}
          ></div>
        );
      })}
      <img
        style={{ maxHeight: "100%" }}
        onClick={imageClickHandler}
        src={map}
        ref={ref}
        alt=""
      />
    </div>
  );
};

export default MapComp;
