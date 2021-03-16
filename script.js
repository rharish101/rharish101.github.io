function getPreferredMode()
{
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
    return "dark";
  else
    return "light";
}

function setMode()
{
  var mode = window.localStorage.getItem("mode");
  if (!mode)
  {
    mode = getPreferredMode();
    window.localStorage.setItem("mode", mode);
  }

  if (mode != "dark")
  {
    document.getElementById("toggle-mode").name = "moon";
    return;
  }

  // Disable transitions temporarily, as they lead to a white flash
  document.body.style.transitionDuration = "0s";
  document.body.classList.toggle("dark-mode");
  document.getElementById("toggle-mode").name = "sunny";
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
  {
    window.localStorage.setItem("mode", "dark");
    document.getElementById("toggle-mode").name = "sunny";
  }
  else
  {
    window.localStorage.setItem("mode", "light");
    document.getElementById("toggle-mode").name = "moon";
  }
}

setMode();
document.getElementById("toggle-mode").onclick = toggleMode;
