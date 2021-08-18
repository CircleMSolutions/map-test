import { useEffect, useRef, useState } from "react";
import map from "../assets/map.png";

interface Props {}

function FindPosition(oElement: any)
{
  if(typeof( oElement.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}

function GetCoordinates(e: any)
{
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(e.target);
  if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];
  return {x: PosX, y: PosY }
}

const MapComp: React.FC<Props> = (props) => {
  const imgRef = useRef<any>();
  const [zoom, setZoom] = useState(false);
  const [scroll, setScroll] = useState({x: 0, y: 0})
  const [pins, setPins] = useState<{x:number, y: number}[]>([])

  const imageClickHandler = (e: any) => {
    const { x, y } = GetCoordinates(e)
    if (e.shiftKey) {
      setPins((prev) => [...prev, {x: x / imgRef.current?.offsetWidth, y: y / imgRef.current?.offsetHeight}])
    }
    if (e.altKey) {
      scroll.x === 0 ? setScroll({x: x , y: (e.clientY / 2) + y}) : setScroll({x: 0, y:0})
      setZoom((prev) => !prev);
    }
  }

  useEffect(() => {
    console.log(imgRef.current?.offsetWidth, imgRef.current?.offsetHeight, imgRef.current?.offsetTop, imgRef.current?.offsetLeft)
    console.log(pins[0]?.x * imgRef.current?.offsetWidth, pins[0]?.y * imgRef.current?.offsetHeight)
  })

  useEffect(() => {
    window.scroll(scroll.x, scroll.y)
  }, [scroll])

  return (
    <div style={{position: 'relative', height: zoom ? 'auto' : '95vh'}}>
      {pins.map(pin => {
        const top = pin.y * imgRef.current?.offsetHeight
        const left = pin.x * imgRef.current?.offsetWidth + imgRef.current?.offsetLeft
        return <div key={Math.random()} style={{position: 'absolute', top, left, height: '10px', width: '10px', background: 'red'}}></div>
})}
      <img
        style={{maxHeight: '100%'}}
        onClick={imageClickHandler}
        src={map}
        alt=""
        ref={imgRef}
      />
    </div>
  );
};

export default MapComp;
