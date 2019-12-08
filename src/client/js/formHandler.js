import { sanitizeInput } from "./utils";
import { snackbar } from "./snackbar";

function handleSubmit(event) {
  event.preventDefault();

  snackbar();

  // check what text was put into the form field
  const formText = document.getElementById("url").value;

  const data = sanitizeInput(formText);

  return fetch("https://nlp-1.herokuapp.com/nlp", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      console.log("response found");
      console.log({ res });
      const { text = "", language = "", categories = [] } = res.response;
      let str = "<span>";
      categories.forEach((category, index) => {
        str += `<h3 style="color : red;">(${index +
          1})</h3><h3>Confidence Level: <span style="color:red">${
          category.confidence
        }</span></h3><br> <h3>Label: <span style="color: red">${
          category.label
        }</span></h3><br> <h3>Code: <span style="color: red">${
          category.code
        }</span> </h3><br>`;
      });
      str += "</span>";
      document.getElementById("results").innerHTML = `
          <h3 style="color:red">Results</h3>
          <p>Resolved text: <span style="color: red"> ${text}</p>
          <h4>Language: <span style="color:red"> ${language.toUpperCase()}</span></h4>
          <h1>CATEGORIES</h4>
          <span>
         ${str}
          </span>
      `;

      return res;
    })
    .catch(error => snackbar(error.message ? error.message : "Error!"));
}

export { handleSubmit };
