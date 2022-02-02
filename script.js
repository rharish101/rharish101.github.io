// IDs
const MODE_BTN_ID = "mode-btn";
const MODE_ICON_ID = "mode-icon";

// Icon for light/dark mode switching
const LIGHT_MODE_ICON = "bi-sun-fill"; // shown in dark mode
const DARK_MODE_ICON = "bi-moon-fill"; // shown in light mode

// Text shown on hovering
const LIGHT_MODE_TEXT = "Switch to light mode"; // shown in dark mode
const DARK_MODE_TEXT = "Switch to dark mode"; // shown in light mode

// Transition duration for the background
const TRANSITION = "0.1s";

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
  // Make the mode button visible, as `display` is set to `hidden`
  var modeButton = document.getElementById(MODE_BTN_ID);
  modeButton.style.display = "block";

  var mode = window.localStorage.getItem("mode");
  if (!mode)
    mode = getPreferredMode();

  if (mode != "dark")
  {
    document.getElementById(MODE_ICON_ID).classList = DARK_MODE_ICON;
    return;
  }

  // Disable transitions temporarily, as they lead to a white flash
  document.body.style.transitionDuration = "0s";
  toggleMode();
  setTimeout(
    function () {
      document.body.style.transitionDuration = TRANSITION;
    }, 100
  );
}

function toggleMode()
{
  document.body.classList.toggle("dark-mode");
  var modeButton = document.getElementById(MODE_BTN_ID);
  var modeIcon = document.getElementById(MODE_ICON_ID);

  if (document.body.classList.contains("dark-mode"))
  {
    modeIcon.classList = LIGHT_MODE_ICON;
    modeButton.title = LIGHT_MODE_TEXT;
    return "dark";
  }
  else
  {
    modeIcon.classList = DARK_MODE_ICON;
    modeButton.title = DARK_MODE_TEXT;
    return "light";
  }
}

function toggleAndSetMode()
{
  var newMode = toggleMode();
  window.localStorage.setItem("mode", newMode);
}

initMode();
document.getElementById(MODE_BTN_ID).onclick = toggleAndSetMode;
