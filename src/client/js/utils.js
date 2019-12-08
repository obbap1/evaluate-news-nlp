import { snackbar } from "./snackbar";

function sanitizeInput(text) {
  console.log("::: Sanitizing Input :::");
  // check if it starts with http or https ?
  const httpsChecker = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*/;

  // set default to text
  let type = "text";

  if (!text) return snackbar("Please fill out this field");

  // check if it is a valid URL
  if (httpsChecker.test(text)) {
    // set type to URL
    type = "url";
  }

  // Set default snackbar response
  let response = `Type: ${type.toUpperCase()}, Please Hold on...`;
  // show response
  snackbar(response);
  // return details
  return { type, text };
}

export { sanitizeInput };
