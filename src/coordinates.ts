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
  
  export function getCoordinates(e: any) {
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