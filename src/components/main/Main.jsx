import React, { useEffect, useRef, useState } from "react";
import initialData from "../../context/initialData.json";

import "./main.css";

const Main = () => {
  const data = initialData;

  const [slotCur, setSlotCur] = useState(data.slots);
  const [rowCur, setRowCur] = useState(data.rowOrder[0]);
  const [select, setSelect] = useState("");
  // array of each slot in current row
  // 8 slots of array

  const [nextFocus, setNextFocus] = useState("");

  const slotRefs = useRef([]);
  slotRefs.current = [];

  const operators = ["+", "-", "*", "/", "="];

  //add element to refs
  const addToRefs = (el) => {
    if (el && !slotRefs.current.includes(el)) {
      slotRefs.current.push(el);
    }
  };

  //check the key value what they need to do
  const onKeyDown = (e, slot) => {
    console.log("e.key", e.key);
    if (!isNaN(e.key) || operators.includes(e.key)) {
      // array of the rest of slots
      const restSlots = data.rows[rowCur].slotIds.slice(
        parseInt(slot.charAt(slot.length - 1)) + 1
      );
      findEmptySlot(restSlots);
      setSlotCur({ ...slotCur, [slot]: e.key });
    } else if (e.key == "Backspace") {
      if (slotCur[slot] == "") {
        if (slotIndex(slot) !== "0") {
          const newSlotIndex = parseInt(slotIndex(slot)) - 1;
          const newSlot = slot.slice(0, -1) + newSlotIndex;
          setSlotCur({ ...slotCur, [newSlot]: "" });
          setRef(newSlotIndex);
        }
      } else if (slotCur[slot] !== "") {
        setSlotCur({ ...slotCur, [slot]: "" });
      }
    } else if (e.key == "ArrowLeft") {
      if (slotIndex(slot) !== "0") {
        const newSlotIndex = parseInt(slotIndex(slot)) - 1;
        console.log("newSlotIndex", newSlotIndex);
        setRef(newSlotIndex);
      }
    } else if (e.key == "ArrowRight") {
      if (slotIndex(slot) !== "7") {
        const newSlotIndex = parseInt(slotIndex(slot)) + 1;
        console.log("newSlotIndex", newSlotIndex);
        setRef(newSlotIndex);
      }
    }
  };

  //return index value of slots
  const slotIndex = (slot) => {
    return slot.slice(-1);
  };

  //find the next empty slot to focus
  const findEmptySlot = (restSlots) => {
    const rest = restSlots.map((isEmpty) => {
      if (slotCur[isEmpty] == "") {
        return isEmpty;
      }
    });

    const emptySlots = rest.filter((element) => {
      return element !== undefined;
    });

    //we just need 1 slot that closest to the current slot
    if (emptySlots.length != 0) {
      setRef(slotIndex(emptySlots[0]));
    } else if (restSlots.length !== 0) {
      setRef(slotIndex(restSlots[0]));
    }
  };

  const onClick = (e, slot) => {
    setRef(slotIndex(slot));
  };

  //set focus
  const setRef = (slotIndex) => {
    slotRefs.current[slotIndex].focus();
  };

  useEffect(() => {
    slotRefs.current[0].focus();
  }, []);

  return (
    <div className='main'>
      {data.rowOrder.map((row, i) => (
        <div key={i} className='row'>
          {data.rows[row].slotIds.map((slot, j) => (
            <div key={j}>
              {/*
              // TODO Move focus to next empty slot when put the value in slot
                - action start when user put a vlue in slot
                - know the index of current slot 
                - find the next index of empty slot in current row

              */}
              {row == rowCur ? (
                <div
                  // className={slot == select ? "col col-border" : "col "}
                  className='col '
                  tabIndex='-1'
                  onClick={(e) => onClick(e, slot)}
                  ref={addToRefs}
                  onKeyDown={(e) => onKeyDown(e, slot)}
                >
                  <p className='slot'>{slotCur[slot]}</p>
                </div>
              ) : (
                <div className='col' tabIndex='-1'>
                  <p className='slot'>{slotCur[slot]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Main;
