import { useEffect, useState } from "react";
import map from "../assets/map.png";
import { useResizeDetector } from "react-resize-detector";
import { Hyrdant } from "../models/hydrants";
import { getCoordinates } from "../coordinates";
import { DUMMY_STREETS } from "../models/streets";
import { DUMMY_BLOCKS } from "../models/blocks";
import Dialog from "./Dialog";
import iconH from "../assets/008-h.svg";
import iconB from "../assets/002-b.svg";
import iconS from "../assets/019-s.svg";
import Hydrant from "./Hydrant";

interface Props {}

export interface BlockDialogDetails {
  id: number;
  type: "block" | "street";
  value: string;
}

export interface Target {
  id: number;
  x: number;
  y: number;
  variance: number;
}

const MapComp: React.FC<Props> = (props) => {
  const { width, height, ref } = useResizeDetector();
  const [zoom, setZoom] = useState(false);
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  const [pins, setPins] = useState<Hyrdant[]>([]);
  const [showDialog, setShowDialog] = useState<BlockDialogDetails | null>(null);
  const [blocks, setBlocks] = useState(DUMMY_BLOCKS);
  const [streets, setStreets] = useState(DUMMY_STREETS);
  const [targets, setTargets] = useState<Target[]>([]);

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
      setTargets((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: x / width!,
          y: y / height!,
          variance: 0.05,
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
    setShowDialog({ id, type: "block", value });
  };

  const streetClickHandler = (id: number, value: string) => {
    setShowDialog({ id, type: "street", value });
  };

  const blockChangedHandler = (id: number, value: string) => {
    const updated = blocks.map((block) => {
      if (block.id === id) {
        return { ...block, text: value };
      }
      return block;
    });
    setBlocks(updated);
    setShowDialog(null);
  };

  const streetChangedHandler = (id: number, value: string) => {
    const updated = streets.map((street) => {
      if (street.id === id) {
        return { ...street, text: value };
      }
      return street;
    });
    setStreets(updated);
    setShowDialog(null);
  };

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
          return (
            <Hydrant
              id={pin.id}
              top={top}
              left={left}
              zoom={zoom}
              icon={iconH}
              onClick={clearPinHandler.bind(null, pin.id)}
            />
          );
        })}
        {targets.map((target) => {
          const top = target.y * height!;
          const left = target.x * width! + ref.current?.offsetLeft;
          return (
            <div
              key={target.id}
              onClick={clearPinHandler.bind(null, target.id)}
              style={{
                position: "absolute",
                top,
                left,
                height: target.variance * height!,
                width: target.variance * width!,
                border: "1px solid red",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            ></div>
          );
        })}
        {streets.map((street) => {
          const top = street.y * height!;
          const left = street.x * width! + ref.current?.offsetLeft;
          return (
            <div
              key={street.id}
              style={{
                fontSize: zoom ? "1.2rem" : "0.8rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                position: "absolute",
                top,
                left,
                transform: `translate(-50%, -50%) rotate(${street.rotation})`,
                cursor: "pointer",
              }}
              onClick={streetClickHandler.bind(null, street.id, street.text)}
            >
              {street.text === "" ? (
                <img src={iconS} style={{ height: "1.5rem" }} alt="street" />
              ) : (
                street.text
              )}
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
              {block.text === "" ? (
                <img src={iconB} style={{ height: "1.5rem" }} alt="street" />
              ) : (
                block.text
              )}
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
      {showDialog?.type === "block" && (
        <Dialog
          onConfirm={blockChangedHandler}
          value={showDialog.value}
          type={showDialog.type}
          id={showDialog.id}
          title="Enter Block"
          onCancel={() => setShowDialog(null)}
        />
      )}
      {showDialog?.type === "street" && (
        <Dialog
          onConfirm={streetChangedHandler}
          value={showDialog.value}
          type={showDialog.type}
          id={showDialog.id}
          title="Enter Steet"
          onCancel={() => setShowDialog(null)}
        />
      )}
    </>
  );
};

export default MapComp;
