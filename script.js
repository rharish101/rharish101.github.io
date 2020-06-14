function setMode()
{
  var mode = window.localStorage.getItem("mode");
  if (mode != "dark")
    return;

  // Disable transitions temporarily, as they lead to a white flash
  document.body.style.transitionDuration = "0s";
  document.body.classList.toggle("dark-mode");
  setTimeout(
    function () {
      document.body.style.transitionDuration = "0.1s";
    }, 100
  );
}

function toggleMode()
{
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode"))
    window.localStorage.setItem("mode", "dark");
  else
    window.localStorage.setItem("mode", "light");
}

setMode();
document.getElementById("toggle-mode").onclick = toggleMode;
