// Icon for light/dark mode switching
const LIGHT_MODE_ICON = "sunny"; // shown in dark mode
const DARK_MODE_ICON = "moon"; // shown in light mode

// Text shown on hovering
const LIGHT_MODE_TEXT = "Switch to light mode"; // shown in dark mode
const DARK_MODE_TEXT = "Switch to dark mode"; // shown in light mode

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

function initMode()
{
  var mode = window.localStorage.getItem("mode");
  if (!mode)
  {
    mode = getPreferredMode();
    window.localStorage.setItem("mode", mode);
  }

  if (mode != "dark")
  {
    document.getElementById("toggle-mode").name = DARK_MODE_ICON;
    return;
  }

  // Disable transitions temporarily, as they lead to a white flash
  document.body.style.transitionDuration = "0s";
  toggleMode()
  setTimeout(
    function () {
      document.body.style.transitionDuration = "0.1s";
    }, 100
  );
}

function toggleMode()
{
  document.body.classList.toggle("dark-mode");
  var modeButton = document.getElementById("toggle-mode");

  if (document.body.classList.contains("dark-mode"))
  {
    window.localStorage.setItem("mode", "dark");
    modeButton.name = LIGHT_MODE_ICON;
    modeButton.title = LIGHT_MODE_TEXT;
  }
  else
  {
    window.localStorage.setItem("mode", "light");
    modeButton.name = DARK_MODE_ICON;
    modeButton.title = DARK_MODE_TEXT;
  }
}

initMode();
document.getElementById("toggle-mode").onclick = toggleMode;
