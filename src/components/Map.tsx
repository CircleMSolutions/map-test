import { useEffect, useState } from "react";
import map from "../assets/map.png";
import { useResizeDetector } from 'react-resize-detector';
import { isLabeledStatement } from "typescript";

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
  const [pins, setPins] = useState<{ id: number, x: number; y: number }[]>([]);
  const labels = [
    {
      id: Math.random(),
      x: .4888103,
      y: .3369245,
      rotation: '-35deg',
      text: "Indian Hill Rd"
    },
    {
      id: Math.random(),
      x: .54000,
      y: .4980,
      rotation: '0deg',
      text: 'Highfield Dr'
    }
  ]

  const blocks = [
    {
      id: Math.random(),
      x: .4500,
      y: .4980,
      rotation: '0deg',
      text: "1800"
    },
    {
      id: Math.random(),
      x: .8500,
      y: .5160,
      rotation: '0deg',
      text: "1900"
    }
  ]

  const imageClickHandler = (e: any) => {
    const { x, y } = GetCoordinates(e);
    if (e.shiftKey) {
      setPins((prev) => [
        ...prev,
        {
          id: Math.random(),
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

  const clearPinHandler = (id: number, e: any) => {
    if (e.metaKey) {
    const tempPins = pins.filter(pin => pin.id !== id)
    setPins(tempPins)
    }
  }

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
        console.log(pin.x, pin.y)
        return (
          <div
            key={pin.id}
            onClick={clearPinHandler.bind(null, pin.id)}
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
      {labels.map((label) => {
        const top = label.y * height!;
        const left = label.x * width! + ref.current?.offsetLeft;
        return <div
          key={label.id}
          style={{
            fontSize: zoom ? '1.2rem' : '0.8rem',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            position: 'absolute',
            top,
            left,
            transform: `translate(-50%, -50%) rotate(${label.rotation})`,
          }}
        >{label.text}</div>
      })}
      {blocks.map((block) => {
        const top = block.y * height!;
        const left = block.x * width! + ref.current?.offsetLeft;
        return <div
          key={block.id}
          style={{
            fontSize: zoom ? '1.2rem' : '0.8rem',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            position: 'absolute',
            color: "green",
            top,
            left,
            transform: `translate(-50%, -50%) rotate(${block.rotation})`,
          }}
        >{block.text}</div>
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
