/* JS Library example */
"use strict";
console.log("examples.js");

initForm({
  divId: "formDiv",
  autoSave: true,
  theme: "basic",
  columns: 2,
  elements: [
    [
      {
        type: "textLabel",
        value: "Welcome to the application!",
        size: "1,2",
      },
    ],
    [
      {
        type: "textInput",
        placeholder: "First Name",
        required: true,
        size: "1,1",
      },
      {
        type: "textInput",
        placeholder: "Last Name",
        required: true,
        size: "1,1",
      },
    ],
    [
      {
        type: "textInput",
        placeholder: "Phone Number",
        required: true,
        size: "1,1",
        validator: "numeric",
      },
      {
        type: "textInput",
        placeholder: "Email",
        required: true,
        size: "1,1",
        validator: "email",
      },
    ],
    [
      {
        type: "textInput",
        placeholder: "Why do you want this job?",
        required: true,
        size: "2,2",
      },
    ],
    [
      {
        type: "fileInput",
        name: "Upload Resume",
        required: true,
        size: "1,2",
        validator: "pdf",
      },
    ],
    [
      {
        type: "textLabel",
        value: "Are you sure your info is correct?",
        required: true,
        size: "1,2",
      },
    ],
    [
      {
        type: "dropDown",
        name: "Choose an option",
        options: ["Yes", "No"],
        required: true,
        size: "1,2",
      },
    ],
    [
      {
        type: "submit",
        size: "1,2",
      },
    ],
  ],
  onSubmit: (state) => {
    console.log(state);
    alert("Thank you for filling out the application!");
  },
}).buildForm();
