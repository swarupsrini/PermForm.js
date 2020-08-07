/* PermForm.js Library */
"use strict";
const log = console.log;
log("PermForm.js");

/**
 * Initializes the form from specifications.
 * Returns the newly created DOM element.
 *
 * @function
 * @param {Object} specs JSON specificatons for the form to create.
 * @returns {Object} The newly created form object.
 */
function initForm(specs) {
  const _self = {};
  _self.specs = specs;
  if (
    specs.autoSave &&
    localStorage.hasOwnProperty("PermForm-" + _self.divId)
  ) {
    _self.state = localStorage.getItem("PermForm-" + _self.divId).split(",");
    _self.state = !Array.isArray(_self.state)
      ? new Array(specs.elements.length).fill(null)
      : _self.state;
  } else {
    _self.state = new Array(specs.elements.length).fill(null);
  }

  window.addEventListener("beforeunload", (e) => {
    specs.autoSave &&
      localStorage.setItem("PermForm-" + _self.divId, _self.state);
  });

  /**
   * Creates a form using specifications. Each element must have a state.
   *
   * @param {Object} specs Specifications and settings to create the form.
   * @returns {Element} The form element.
   */
  _self.buildForm = function () {
    const specs = _self.specs;
    const theme = formInfo.themes[specs.theme];
    const formStyle = theme.formStyle;
    const elements = theme.elements;

    const divElem = document.getElementById(specs.divId);
    const formElem = document.createElement("form");

    log(typeof formStyle);

    Object.keys(formStyle).forEach(
      (item) => (formElem.style[item] = formStyle[item])
    );
    // Object.assign(formElem.style, formStyle);
    formElem.style.gridTemplateColumns = "minmax(0, 1fr) ".repeat(
      specs.columns
    );

    specs.elements.forEach((elemSpecs, i) => {
      const posCol =
        elemSpecs.position.split(",")[1] +
        " / span " +
        elemSpecs.size.split(",")[1];
      const posRow =
        elemSpecs.position.split(",")[0] +
        " / span " +
        elemSpecs.size.split(",")[0];
      const changeState = (s) => {
        _self.state[i] = s;
      };
      elemSpecs.type in elements &&
        formElem.appendChild(
          elements[elemSpecs.type](
            elemSpecs,
            _self.state[i],
            changeState,
            posRow,
            posCol
          )
        );
    });

    formElem.addEventListener("submit", (e) => {
      e.preventDefault();
      specs.onSubmit(_self.state);
    });

    divElem.appendChild(formElem);
  };

  /**
   * Returns the JS Object version of the form that can be reloaded back to
   * re-create the form later on.
   *
   * @returns {Object} the JS object version of the form.
   */
  _self.exportForm = function () {
    return _self.specs;
  };

  _self.exportState = function () {
    return _self.state;
  };

  return _self;
}

/**
 * The mapping that stores theme information, along with the code for each
 * component part of that theme. Also stores validator functions for each
 * element.
 *
 * Currently implemented themes: basic
 * Currently implemented elements: label, text input, file input, submit
 *
 * Future elements: drop down, check box, radio, slider, date picker
 */
const formInfo = {
  themes: {
    basic: {
      formStyle: {
        fontSize: "20px",
        fontFamily: "Arial",
        gridColumnGap: "10px",
        gridRowGap: "20px",
        display: "grid",
        padding: "10px",
      },
      elements: {
        textLabel: (elemSpecs, state, setState, posRow, posCol) => {
          const elem = document.createElement("label");
          elem.innerText = elemSpecs.value;
          Object.assign(elem.style, {
            gridColumn: posCol,
            gridRow: posRow,
            fontSize: "1em",
          });
          return elem;
        },
        textInput: (elemSpecs, state, setState, posRow, posCol) => {
          const elem = document.createElement("textArea");
          elem.placeholder = elemSpecs.placeholder;
          if (state) elem.value = state;
          elem.addEventListener("change", (e) => {
            setState(elem.value);
            if (
              elemSpecs.validator in formInfo.validators &&
              !formInfo.validators[elemSpecs.validator](elem.value)
            ) {
              elem.style.border = "2px solid red";
              elem.setCustomValidity("Invalid field.");
            } else {
              elem.style.border = "";
              elem.setCustomValidity("");
            }
          });
          elem.required = elemSpecs.required;
          Object.assign(elem.style, {
            gridColumn: posCol,
            gridRow: posRow,
            fontFamily: "inherit",
            resize: "none",
            fontSize: ".75em",
            padding: ".5em 1em",
            height: 20 * posRow.slice(-1) + "px",
            verticalAlign: "top",
          });
          return elem;
        },
        fileInput: (elemSpecs, state, setState, posRow, posCol) => {
          const div = document.createElement("div");
          const button = document.createElement("button");
          const input = document.createElement("input");
          Object.assign(div.style, {
            gridColumn: posCol,
            gridRow: posRow,
            position: "relative",
            overflow: "hidden",
          });
          button.innerHTML = elemSpecs.name;
          if (state) button.innerHTML = elemSpecs.name + ": " + state;
          Object.assign(button.style, {
            fontSize: ".75em",
            width: "100%",
            padding: ".5em",
          });
          input.type = "file";
          input.required = elemSpecs.required;
          input.addEventListener("change", (e) => {
            let fileName = input.value.split("\\").pop();
            if (fileName.length == 0) fileName = "";
            else if (fileName.length > 50)
              fileName = fileName.substring(0, 50) + "...";
            button.innerHTML = elemSpecs.name + ": " + fileName;
            setState(fileName);
          });
          Object.assign(input.style, {
            fontSize: "100px",
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 0,
          });
          div.appendChild(button);
          div.appendChild(input);
          return div;
        },
        dropDown: (elemSpecs, state, changeState, posRow, posCol) => {},
        submit: (elemSpecs, state, changeState, posRow, posCol) => {
          const input = document.createElement("input");
          input.type = "submit";
          Object.assign(input.style, {
            gridColumn: posCol,
            gridRow: posRow,
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: ".75em",
            width: "100%",
            padding: ".5em",
            border: "3px solid #4CAF50",
            borderRadius: "5px",
            cursor: "pointer",
          });
          return input;
        },
      },
    },
  },
  validators: {
    numeric: (value) => !isNaN(value),
    email: (value) => /(^\S+@\S+$)|^$/.test(value),
  },
};
