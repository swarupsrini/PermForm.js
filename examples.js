/* JS Library example */
"use strict";
console.log("examples.js");

const form = initForm({
  divId: "formDiv",
  autoSave: true,
  theme: "basic",
  elements: [
    {
      type: "textLabel",
      value: "Please enter your name below",
      position: "1,1",
      colWidth: "2",
      // columnWidth: "1",
    },
    {
      type: "textInput",
      placeholder: "First Name",
      required: true,
      position: "2,1",
      // columnWidth: "1",
      validator: "text",
    },
    {
      type: "textInput",
      placeholder: "Last Name",
      required: true,
      position: "2,2",
      // columnWidth: "1",
      validator: "text",
    },
    {
      type: "fileInput",
      name: "Resume",
      required: true,
      position: "3,1",
      // columnWidth: "1",
      validator: "pdf",
    },
  ],
  onSubmit: () => console.log("submitted"),
});
