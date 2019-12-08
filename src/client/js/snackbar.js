function snackbar(text) {
  // Get the snackbar DIV
  const x = document.getElementById("snackbar");

  console.log({ x, document });

  x.innerHTML = text ? text : "Processing...";

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);

  return x;
}

export { snackbar };
