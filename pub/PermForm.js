/* PermForm.js Library */
"use strict";

const log = console.log;
log("PermForm.js");

(function (global) {
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
    // localStorage.clear(); // TEMP
    if (
      specs.autoSave &&
      localStorage.hasOwnProperty("PermForm-" + specs.divId)
    ) {
      _self.state = localStorage.getItem("PermForm-" + specs.divId);
      _self.state = JSON.parse(_self.state);
      _self.state = !Array.isArray(_self.state) ? [] : _self.state;
    } else {
      _self.state = [];
    }

    window.addEventListener("beforeunload", (e) => {
      specs.autoSave &&
        localStorage.setItem(
          "PermForm-" + specs.divId,
          JSON.stringify(_self.state)
        );
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

      Object.keys(formStyle).forEach(
        (item) => (formElem.style[item] = formStyle[item])
      );

      formElem.style.gridTemplateColumns = "1fr ".repeat(specs.columns);
      formElem.style.gridTemplateRows = "1fr ".repeat(
        specs.elements.reduce(
          (acc, cur) => acc + parseInt(cur[0].size.substring(0)),
          0
        )
      );

      specs.elements.forEach((row, x) => {
        // if row's state array DNE, set it
        if (!_self.state[x]) _self.state[x] = [];
        row.forEach((elemSpecs, y) => {
          // for elements to set their states
          const setState = (s) => (_self.state[x][y] = s);

          // get the element required
          if (elemSpecs.type in elements) {
            const size = elemSpecs.size.split(",");
            const elem = elements[elemSpecs.type](
              elemSpecs,
              _self.state[x][y],
              setState,
              size[1]
            );

            // add positioning
            elem.style.gridColumn = "span " + size[1];
            elem.style.gridRow = "span " + size[0];

            // add draggability
            if (specs.draggable) addDrag(elem);

            formElem.appendChild(elem);
          }
        });
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

    /**
     * Returns the current state of all elements on the form.
     *
     * @returns {Object} the JS object version of the form.
     */
    _self.exportState = function () {
      return _self.state;
    };

    return _self;
  }

  const addDrag = (elem) => {
    elem.draggable = true;
    // select types don't work with the draggability
    if (elem.type === "select-one") elem.disabled = true;
    elem.addEventListener("dragstart", (e) => {
      elem.className = "dragging";
      elem.borderTemp = elem.style.border;
      elem.borderWidthTemp = elem.style.borderWidth;
      elem.style.border = "3px dotted black";
    });
    elem.addEventListener("dragover", (e) => {
      const src = document.querySelector(".dragging");
      if (elem !== src) elem.parentElement.insertBefore(src, elem);
    });
    elem.addEventListener("dragend", (e) => {
      elem.classList.remove("dragging");
      elem.style.border = elem.borderTemp;
      elem.style.borderWidth = elem.borderWidthTemp;
    });
  };

  /**
   * The mapping that stores theme information, along with the code for each
   * component part of that theme. Also stores validator functions for each
   * element.
   *
   * Currently implemented:
   * theme: basic
   * elements: label, text input, file input, submit, drop down
   *
   * Future elements: check box, radio, slider, date picker
   */
  const formInfo = {
    themes: {
      basic: {
        formStyle: {
          fontSize: "20px",
          fontFamily: "Roboto",
          gridColumnGap: "10px",
          gridRowGap: "10px",
          display: "grid",
          height: "100%",
          padding: "10px",
        },
        elements: {
          textLabel: (elemSpecs, state, setState, height) => {
            const elem = document.createElement("label");
            elem.innerText = elemSpecs.value;
            Object.assign(elem.style, {
              fontSize: "1em",
              verticalAlign: "bottom",
              alignSelf: "end",
              boxSizing: "border-box",
            });
            return elem;
          },
          textInput: (elemSpecs, state, setState, height) => {
            const elem = document.createElement(
              height == 1 ? "input" : "textArea"
            );
            elem.placeholder = elemSpecs.placeholder;
            if (state) elem.value = state;
            elem.addEventListener("input", (e) => {
              setState(elem.value);
              if (
                elemSpecs.validator in formInfo.validators &&
                !formInfo.validators[elemSpecs.validator](elem.value)
              ) {
                elem.style.border = "2px solid red";
                elem.setCustomValidity("Invalid field.");
              } else {
                elem.style.border = "";
                elem.style.borderWidth = "1px";
                elem.setCustomValidity("");
              }
            });
            elem.required = elemSpecs.required;
            elem.wrap = "off";
            Object.assign(elem.style, {
              fontFamily: "inherit",
              resize: "none",
              overflow: "hidden",
              borderRadius: "3px",
              borderWidth: "1px",
              fontSize: ".75em",
              padding: ".5em 1em",
              height: "100%",
              boxSizing: "border-box",
              verticalAlign: "top",
            });
            return elem;
          },
          fileInput: (elemSpecs, state, setState, height) => {
            const div = document.createElement("div");
            const button = document.createElement("button");
            const input = document.createElement("input");
            // div
            Object.assign(div.style, {
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              boxSizing: "border-box",
            });
            // button
            button.innerHTML = elemSpecs.name;
            if (state) button.innerHTML = elemSpecs.name + ": " + state;
            Object.assign(button.style, {
              fontSize: ".75em",
              fontFamily: "inherit",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: ".5em",
            });
            // input
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
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              opacity: 0,
            });
            div.appendChild(button);
            div.appendChild(input);
            return div;
          },
          dropDown: (elemSpecs, state, setState, height) => {
            const select = document.createElement("select");
            const label = document.createElement("option");
            // label
            label.innerHTML = elemSpecs.name;
            label.disabled = true;
            label.selected = true;
            label.style.fontFamily = "inherit";
            // select
            select.appendChild(label);
            elemSpecs.options.forEach((op) => {
              const opElem = document.createElement("option");
              opElem.innerHTML = op;
              opElem.value = op;
              if (op == state) opElem.selected = true;
              select.appendChild(opElem);
            });
            select.addEventListener("change", (e) => {
              setState(select.options[select.selectedIndex].value);
            });
            Object.assign(select.style, {
              padding: "8x 12px",
              color: "#333333",
              backgroundColor: "#eeeeee",
              fontFamily: "inherit",
              fontSize: ".75em",
              cursor: "pointer",
              borderRadius: "3px",
              boxSizing: "border-box",
            });
            return select;
          },
          submit: (elemSpecs, state, setState, height) => {
            const input = document.createElement("input");
            input.type = "submit";
            Object.assign(input.style, {
              backgroundColor: "#4CAF50",
              color: "white",
              fontSize: ".75em",
              fontFamily: "inherit",
              width: "100%",
              padding: ".5em",
              border: "3px solid #4CAF50",
              borderRadius: "5px",
              cursor: "pointer",
              boxSizing: "border-box",
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

  global.initForm = global.initForm || initForm;
})(window);
