// "use strict";
console.log("examples.js");

const autosave_data = {
  divId: "autosave-form",
  autoSave: true,
  theme: "basic",
  columns: 1,
  elements: [
    [
      {
        type: "textLabel",
        value: "Here's a form that automatically saves its data!",
        size: "1,1",
      },
    ],
    [
      {
        type: "textInput",
        placeholder: "Write some text!",
        required: true,
        size: "1,1",
      },
    ],
    [
      {
        type: "textInput",
        placeholder: "Everything you do on this form will be saved!",
        required: true,
        size: "2,1",
      },
    ],
    [
      {
        type: "fileInput",
        name: "Upload a file!",
        required: true,
        size: "1,1",
      },
    ],
    [
      {
        type: "dropDown",
        name: "Choose an option!",
        options: ["Yes", "No"],
        required: true,
        size: "1,1",
      },
    ],
  ],
  onSubmit: (state) => {
    console.log(state);
    alert("Thank you for filling out the application!");
  },
};
initForm(autosave_data).buildForm();

const drag_data = {
  divId: "drag-form",
  theme: "basic",
  columns: 2,
  draggable: true,
  elements: [
    [
      {
        type: "textLabel",
        value: "Drag anything on this form!",
        size: "1,2",
      },
    ],
    [
      {
        type: "textInput",
        placeholder: "Drag me!",
        required: true,
        size: "1,1",
      },
      {
        type: "textInput",
        placeholder: "Drag me too!",
        required: true,
        size: "1,1",
      },
    ],
    [
      {
        type: "textInput",
        placeholder: "Drag me three!",
        required: true,
        size: "1,1",
      },
      {
        type: "textInput",
        placeholder: "Drag me four!",
        required: true,
        size: "1,1",
      },
    ],
    [
      {
        type: "textInput",
        placeholder: "A big draggable!",
        required: true,
        size: "2,2",
      },
    ],
    [
      {
        type: "fileInput",
        name: "Draggable file input!",
        required: true,
        size: "1,1",
      },
      {
        type: "dropDown",
        name: "Draggable drop-down!",
        options: ["Yes", "No"],
        required: true,
        size: "1,1",
      },
    ],
  ],
  onSubmit: (state) => {
    console.log(state);
    alert("Thank you for filling out the application!");
  },
};
initForm(drag_data).buildForm();

const valid_data = {
  divId: "validate-form",
  theme: "basic",
  columns: 2,
  elements: [
    [
      {
        type: "textLabel",
        value: "This form validates all data when you click submit!",
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
};
initForm(valid_data).buildForm();

initFormSimple("simple-form", [
  "textLabel",
  "textInput",
  "fileInput",
  "dropDown",
  "submit",
]).buildForm();

let initial_data = {
  divId: "try-form",
  autoSave: true,
  theme: "basic",
  columns: 2,
  draggable: true,
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
};

const form = initForm(initial_data);
form.buildForm();

var container = document.getElementById("jsoneditor");
var options = {
  mode: "code",
  onChange: () => {
    const data = editor.get();
    form.rebuildForm(data);
  },
};
var editor = new JSONEditor(container, options);
editor.set(initial_data);
