/* JS Library example */
"use strict";
console.log("examples.js");

const form = initForm({
  divId: "formDiv",
  autoSave: true,
  fontSize: "20px",
  colSpace: "10px",
  size: "3,2",
  elements: [
    {
      type: "textLabel",
      state: "Just a label",
      position: "1,1",
      size: "2",
    },
    {
      type: "textInput",
      state: "First Name",
      required: true,
      position: "2,1",
      size: "1,1",
      validator: "text",
    },
    {
      type: "textInput",
      state: "Last Name",
      required: true,
      position: "2,2",
      size: "1,1",
      validator: "text",
    },
    {
      type: "fileInput",
      state: "Resume",
      required: true,
      position: "3,1",
      size: "2,1",
      validator: "pdf",
    },
  ],
  onSubmit: () => console.log("submitted"),
});
