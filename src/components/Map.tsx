import { useEffect, useState } from "react";
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
  const [zoom, setZoom] = useState(true);

  const zoomHandler = () => {
    setZoom((prev) => !prev);
  };

  const imageClickHandler = (e: any) => {
    const { x, y } = GetCoordinates(e)
    const scale = e.target.width / e.target.naturalWidth
    console.log((x * 1/(scale)).toFixed(0), (y * 1/(scale)).toFixed(0), zoom)
  }

  useEffect(() => {
    const callback = (e: any) => {
      if (e.key.toLowerCase() === 'z') {
        setZoom((prev) => !prev)
      }
    }
    document.addEventListener('keyup', callback)
    return () => document.removeEventListener('keyup', callback)
  })

  return (
    <>
      <button type="button" style={{position: 'fixed', top: '1rem', left: '1rem'}} onClick={zoomHandler}>ZOOM</button>
      <img
        style={zoom ? {height: 'auto'} : {height: '95vh'}}
        onClick={imageClickHandler}
        src={map}
        alt=""
      />
    </>
  );
};

export default MapComp;
