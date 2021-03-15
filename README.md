# PermForm.js

Your one stop shop for building seamless forms. PermForm.js is a JavaScript library for creating flexible, customizable forms with a simplistic API providing many powerful features: autosave, grid placement (so you don't have to worry about any positioning) dragging system for visually building the form, and input validation.

[Click here to visit the library documentation!](https://gentle-tor-17639.herokuapp.com)

## Tech

`JavaScript`, `Node.js`

## Getting Started

In this page you will see a short overview to get started with PermForm followed by a detailed API documentation.

## Motives

When building websites, building forms are often challenging. More than often, we have to implement many features ourselves. PermForm.js aims to give you a permanent solution to all your form needs.

## Demo

[Click here to check out some demos!](https://gentle-tor-17639.herokuapp.com/examples.html)

## Usage

### Installation

To use PermForm, you must first include the JavaScript file in the \<head> section of your web page:

```html
<script defer type="text/javascript" src="PermForm.js"></script>
```

### Sample code

A code snippet of some code that creates a form inside the div with ID "simple-form" which must already exist on your page.

```javascript
initFormSimple("simple-form", [
  "textLabel",
  "textInput",
  "fileInput",
  "dropDown",
  "submit",
]).buildForm();
```
