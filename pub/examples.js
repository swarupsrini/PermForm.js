/* JS Library example */
"use strict";
console.log("examples.js");

initForm({
  divId: "formDiv",
  autoSave: true,
  theme: "basic",
  columns: 2,
  elements: [
    {
      type: "textLabel",
      value: "Welcome to the application!",
      position: "1,1",
      size: "1,2",
    },
    {
      type: "textInput",
      placeholder: "First Name",
      required: true,
      size: "1,1",
      position: "2,1",
    },
    {
      type: "textInput",
      placeholder: "Last Name",
      required: true,
      size: "1,1",
      position: "2,2",
    },
    {
      type: "textInput",
      placeholder: "Phone Number",
      required: true,
      position: "3,1",
      size: "1,1",
      validator: "numeric",
    },
    {
      type: "textInput",
      placeholder: "Email",
      required: true,
      position: "3,2",
      size: "1,1",
      validator: "email",
    },
    {
      type: "textInput",
      placeholder: "Why do you want this job?",
      required: true,
      position: "4,1",
      size: "4,2",
    },
    {
      type: "fileInput",
      name: "Upload Resume",
      required: true,
      position: "8,1",
      size: "1,2",
      validator: "pdf",
    },
    {
      type: "textInput",
      placeholder: "Is your info correct?",
      required: true,
      position: "9,1",
      size: "1,2",
    },
    {
      type: "dropDown",
      name: "Choose an option",
      required: true,
      position: "10,1",
      size: "1,2",
    },
    {
      type: "submit",
      position: "9,1",
      size: "1,2",
    },
  ],
  onSubmit: (state) => {
    console.log(state);
    alert("Thank you for filling out the application!");
  },
}).buildForm();
