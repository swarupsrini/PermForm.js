/* PermForm.js Library */
"use strict";
const log = console.log;
log("PermForm.js");

/* Load form from localStorage if exists. */
// let form_store = window.localStorage.getItem("PermFormStorage");
// form_store = form_store !== null ? form_store : {};

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
  _self.specs = loadSpecs(specs); // wrap this in a themer
  _self.formElement = buildForm(_self.specs);

  /**
   * Returns the JS Object version of the form that can be reloaded back to
   * re-create the form later on.
   *
   * @returns {Object} the JS object version of the form.
   */
  _self.exportForm = function () {
    return _self.specs;
  };

  return _self;
}

/**
 * Looks up localStorage to see if similar specifications have been stored.
 * If so, overrides the provided specs and returns that instead. If not
 * present, returns the specs as provided.
 *
 * @param {Object} specs Provided specifications.
 * @returns {Object} The loaded specs (if any).
 */
function loadSpecs(specs) {
  // states
  //    if autosave enabled, check storage to restore the state
  //    also states could be given in the JSON
  // build form from specs, use divId as unique ID to identify the form
  return specs;
}

// write initFormSimple that just takes an array of elements and puts it all in a list like form

/**
 * Creates a form using specifications. Each element must have a state.
 *
 * @param {Object} specs Specifications and settings to create the form.
 * @returns {Element} The form element.
 */
function buildForm(specs) {
  // create all the elements
  //    use some global map to store styled template elements
  //     grab the template for each item type in specs.elements
  //     set the state to be the grabbed state
  //     also if autosave enabled, make it so that when text changes, update form_store

  const theme = formInfo.themes[specs.theme];
  const formStyle = theme.formStyle;
  const elements = theme.elements;

  const divElem = document.getElementById(specs.divId);
  const formElem = document.createElement("form");

  Object.assign(formElem.style, formStyle);

  specs.elements.forEach((elemSpecs) => {
    const posCol =
      elemSpecs.position.split(",")[1] + " / span " + elemSpecs.colWidth;
    const posRow = elemSpecs.position.split(",")[0];

    elemSpecs.type in elements &&
      formElem.appendChild(elements[elemSpecs.type](elemSpecs, posRow, posCol));
  });

  divElem.appendChild(formElem);

  // attach validators
  //    use global map to store validators for each element type
  //    grab validator function, attach to the element or call custom validator if given
  //
  // grid layout positioning
  //    create grid, add position attributes, manage sizing
  //
  // DOM placement
  //    put all elements inside the div specs.divId
  //
  // return the form root element inside the div
}

// add event listener, on window closed, save every element in form_store that has autosave on - basically filter and save

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
        textLabel: (elemSpecs, posRow, posCol) => {
          const elem = document.createElement("label");
          elem.innerText = elemSpecs.value;
          Object.assign(elem.style, {
            gridColumn: posCol,
            gridRow: posRow,
            fontSize: "1em",
          });
          return elem;
        },
        textInput: (elemSpecs, posRow, posCol) => {
          const elem = document.createElement("input");
          elem.placeholder = elemSpecs.placeholder;
          Object.assign(elem.style, {
            gridColumn: posCol,
            gridRow: posRow,
            fontSize: ".75em",
            padding: ".5em 1em",
          });
          return elem;
        },
      },
    },
  },
  validators: {},
};

// form elements: labels, text fields, drop-down, check box, radio, slider, date picker
