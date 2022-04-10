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

  const nextSlot = useRef([null]);
  const slotRefs = useRef([]);

  const operators = ["+", "-", "*", "/", "="];

  const onKeyDown = (e, slot) => {
    if (!isNaN(e.key) || operators.includes(e.key)) {
      // array of the rest of slots
      const restSlots = data.rows[rowCur].slotIds.slice(
        parseInt(slot.charAt(slot.length - 1)) + 1
      );

      const emptySlot = findEmptySlot(restSlots);
      setSlotCur({ ...slotCur, [slot]: e.key });
      setNextFocus(emptySlot);

      nextSlot.current.focus();
    }
  };

  const findEmptySlot = (restSlots) => {
    const emptySlot = restSlots.map((isEmpty) => {
      if (slotCur[isEmpty] == "") {
        return isEmpty;
      }
    });

    const results = emptySlot.filter((element) => {
      return element !== undefined;
    });

    //we just need 1 slot that closest to the current slot
    return results[0];
  };

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
                <div>
                  {slot == nextFocus ? (
                    <div
                      className={slot == select ? "col col-border" : "col "}
                      tabIndex='-1'
                      onClick={() => {
                        setSelect(slot);
                      }}
                      ref={nextSlot}
                      onKeyDown={(e) => onKeyDown(e, slot)}
                    >
                      <p className='slot'>{slotCur[slot]}</p>
                    </div>
                  ) : (
                    <div
                      className={slot == select ? "col col-border" : "col "}
                      tabIndex='-1'
                      onClick={() => {
                        setSelect(slot);
                      }}
                      onKeyDown={(e) => onKeyDown(e, slot)}
                    >
                      <p className='slot'>{slotCur[slot]}</p>
                    </div>
                  )}
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
