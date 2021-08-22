import { useEffect, useState } from "react";
import map from "../assets/map.png";
import { useResizeDetector } from "react-resize-detector";
import { Hyrdant } from "../models/hydrants";
import { getCoordinates } from "../coordinates";
import { DUMMY_STREETS } from "../models/streets";
import { DUMMY_BLOCKS } from "../models/blocks";
import Dialog from "./Dialog";

interface Props {}

export interface BlockDialogDetails {
  id: number;
  type: "block" | "street";
  value: string
}

const MapComp: React.FC<Props> = (props) => {
  const { width, height, ref } = useResizeDetector();
  const [zoom, setZoom] = useState(false);
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  const [pins, setPins] = useState<Hyrdant[]>([]);
  const [showDialog, setShowDialog] = useState<BlockDialogDetails | null>(null);
  const [blocks, setBlocks] = useState(DUMMY_BLOCKS)

  const imageClickHandler = (e: any) => {
    const { x, y } = getCoordinates(e);
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
      const tempPins = pins.filter((pin) => pin.id !== id);
      setPins(tempPins);
    }
  };

  const blockClickHandler = (id: number, value: string) => {
    setShowDialog({id, type: "block", value})
  };

  const blockChangedHandler = (id: number, value: string) => {
    const updated = blocks.map(block => {
      if (block.id === id) {
        return {...block, text: value}
      }
      return block
    })
    setBlocks(updated)
    setShowDialog(null)
  }

  useEffect(() => {
    window.scroll(scroll.x, scroll.y);
    window.addEventListener("resize", () => {});
    return () => window.removeEventListener("resize", () => {});
  }, [scroll]);

  return (
    <>
      <div style={{ position: "relative", height: zoom ? "auto" : "95vh" }}>
        {pins.map((pin) => {
          const top = pin.y * height!;
          const left = pin.x * width! + ref.current?.offsetLeft;
          console.log(pin.x, pin.y);
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
                transform: "translateX(-7px) translateY(-7px)",
              }}
            ></div>
          );
        })}
        {DUMMY_STREETS.map((label) => {
          const top = label.y * height!;
          const left = label.x * width! + ref.current?.offsetLeft;
          return (
            <div
              key={label.id}
              style={{
                fontSize: zoom ? "1.2rem" : "0.8rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                position: "absolute",
                top,
                left,
                transform: `translate(-50%, -50%) rotate(${label.rotation})`,
              }}
            >
              {label.text}
            </div>
          );
        })}
        {blocks.map((block) => {
          const top = block.y * height!;
          const left = block.x * width! + ref.current?.offsetLeft;
          return (
            <div
              key={block.id}
              style={{
                fontSize: zoom ? "1.2rem" : "0.8rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                position: "absolute",
                color: "green",
                top,
                left,
                transform: `translate(-50%, -50%) rotate(${block.rotation})`,
                cursor: "pointer",
              }}
              onClick={blockClickHandler.bind(null, block.id, block.text)}
            >
              {block.text}
            </div>
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
      {showDialog?.type === "block" && <Dialog onConfirm={blockChangedHandler} value={showDialog.value} type={showDialog.type} id={showDialog.id} title="Enter Block" onCancel={() => setShowDialog(null)} />}
    </>
  );
};

export default MapComp;
