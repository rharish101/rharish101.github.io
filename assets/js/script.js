// IDs
const MODE_BTN_ID = "mode-btn";
const MODE_ICON_ID = "mode-icon";

// Root node attribute for the mode/theme and its values
const MODE_ATTR = "data-theme";
const LIGHT_MODE_VAL = "light";
const DARK_MODE_VAL = "dark";

// Icon for light/dark mode switching
const MODE_ICON = new Map([
  [LIGHT_MODE_VAL, "bi-sun-fill"], // shown in dark mode
  [DARK_MODE_VAL, "bi-moon-fill"], // shown in light mode
]);

// Text shown on hovering
const MODE_TEXT = new Map([
  [LIGHT_MODE_VAL, "Switch to light mode"], // shown in dark mode
  [DARK_MODE_VAL, "Switch to dark mode"], // shown in light mode
]);

// Transition duration for the background
const TRANSITION = "0.1s";

function getPreferredMode()
{
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
    return DARK_MODE_VAL;
  else
    return LIGHT_MODE_VAL;
}

function initMode()
{
  // Make the mode button visible, as `display` is set to `hidden`
  var modeButton = document.getElementById(MODE_BTN_ID);
  modeButton.style.display = "block";

  var mode = window.localStorage.getItem("mode");
  if (!mode)
    mode = getPreferredMode();

  if (mode != DARK_MODE_VAL)
  {
    document.getElementById(MODE_ICON_ID).classList = MODE_ICON.get(preferredMode);
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
  var rootNode = document.documentElement;
  var modeButton = document.getElementById(MODE_BTN_ID);
  var modeIcon = document.getElementById(MODE_ICON_ID);

  var newMode;
  switch (document.documentElement.getAttribute(MODE_ATTR))
  {
    case DARK_MODE_VAL:
      newMode = LIGHT_MODE_VAL;
      break;

    case LIGHT_MODE_VAL:
    default:
      newMode = DARK_MODE_VAL;
      break;
  }

  rootNode.setAttribute(MODE_ATTR, newMode);
  modeIcon.classList = MODE_ICON.get(newMode);
  modeButton.title = MODE_TEXT.get(newMode);
  return newMode;
}

function toggleAndSetMode()
{
  var newMode = toggleMode();
  window.localStorage.setItem("mode", newMode);
}

initMode();
document.getElementById(MODE_BTN_ID).onclick = toggleAndSetMode;
