const fs = require("fs");
const { addAbortSignal } = require("stream");

let slotTemp = {};
let rowOrder = [];

for (let row = 0; row < 6; row++) {
  rowOrder.push("row-" + row);
  for (let slot = 0; slot < 8; slot++) {
    const slotProp = "slot-" + row + "-" + slot;
    const newSlot = {
      ...slotTemp,
      [slotProp]: "",
    };
    // console.log("newSlot", newSlot);
    slotTemp = newSlot;
  }
}

const initialData = {
  rowOrder: ["row-0", "row-1", "row-2", "row-3", "row-4", "row-5"],
  rows: {
    "row-0": {
      id: "row-0",
      slotIds: [
        "slot-0-0",
        "slot-0-1",
        "slot-0-2",
        "slot-0-3",
        "slot-0-4",
        "slot-0-5",
        "slot-0-6",
        "slot-0-7",
      ],
    },
    "row-1": {
      id: "row-1",
      slotIds: [
        "slot-1-0",
        "slot-1-1",
        "slot-1-2",
        "slot-1-3",
        "slot-1-4",
        "slot-1-5",
        "slot-1-6",
        "slot-1-7",
      ],
    },
    "row-2": {
      id: "row-2",
      slotIds: [
        "slot-2-0",
        "slot-2-1",
        "slot-2-2",
        "slot-2-3",
        "slot-2-4",
        "slot-2-5",
        "slot-2-6",
        "slot-2-7",
      ],
    },
    "row-3": {
      id: "row-3",
      slotIds: [
        "slot-3-0",
        "slot-3-1",
        "slot-3-2",
        "slot-3-3",
        "slot-3-4",
        "slot-3-5",
        "slot-3-6",
        "slot-3-7",
      ],
    },
    "row-4": {
      id: "row-4",
      slotIds: [
        "slot-4-0",
        "slot-4-1",
        "slot-4-2",
        "slot-4-3",
        "slot-4-4",
        "slot-4-5",
        "slot-4-6",
        "slot-4-7",
      ],
    },
    "row-5": {
      id: "row-5",
      slotIds: [
        "slot-5-0",
        "slot-5-1",
        "slot-5-2",
        "slot-5-3",
        "slot-5-4",
        "slot-5-5",
        "slot-5-6",
        "slot-5-7",
      ],
    },
    // "row-6": {
    //   id: "row-6",
    //   slotIds: [
    //     "slot-6-0",
    //     "slot-6-1",
    //     "slot-6-2",
    //     "slot-6-3",
    //     "slot-6-4",
    //     "slot-6-5",
    //     "slot-6-6",
    //     "slot-6-7",
    //   ],
    // },
  },

  slots: slotTemp,
};

// console.log("initialData", initialData);

try {
  let data = JSON.stringify(initialData);
  fs.writeFileSync("initialData.json", data);
  //file written successfully
} catch (err) {
  console.error(err);
}
