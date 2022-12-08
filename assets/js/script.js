// IDs
const MODE_BTN_ID = "mode-btn";
const MODE_ICON_ID = "mode-icon";

// Root node attribute for the mode/theme and its values
const MODE_ATTR = "data-theme";
const DEFAULT_MODE_VAL = "default";
const LIGHT_MODE_VAL = "light";
const DARK_MODE_VAL = "dark";

// Icon for light/dark mode switching
const MODE_ICON = new Map([
  [DEFAULT_MODE_VAL, "bi-circle-half"], // shown by default
  [DARK_MODE_VAL, "bi-moon-fill"], // shown in dark mode
  [LIGHT_MODE_VAL, "bi-sun-fill"], // shown in light mode
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

  // Set the appropriate mode icon
  var mode = window.localStorage.getItem("mode") || DEFAULT_MODE_VAL;
  document.getElementById(MODE_ICON_ID).classList = MODE_ICON.get(mode);

  var preferredMode = getPreferredMode();
  // SASS sets the default styling to the browser preferred mode
  if (mode == DEFAULT_MODE_VAL || mode == preferredMode)
    return;

  // Disable transitions temporarily, as they lead to a white flash
  document.body.style.transitionDuration = "0s";

  // Set the mode manually
  document.documentElement.setAttribute(MODE_ATTR, mode);

  // Re-enable transitions
  setTimeout(
    function () {
      document.body.style.transitionDuration = TRANSITION;
    }, 100
  );
}

function toggleMode()
{
  var rootNode = document.documentElement;
  var currMode = rootNode.getAttribute(MODE_ATTR) || DEFAULT_MODE_VAL;

  var newMode;
  switch (currMode)
  {
    case DEFAULT_MODE_VAL:
      newMode = LIGHT_MODE_VAL;
      break;

    case LIGHT_MODE_VAL:
      newMode = DARK_MODE_VAL;
      break;

    case DARK_MODE_VAL:
      newMode = DEFAULT_MODE_VAL;
      break;
  }

  rootNode.setAttribute(MODE_ATTR, newMode);
  document.getElementById(MODE_ICON_ID).classList = MODE_ICON.get(newMode);
  return newMode;
}

function toggleAndSetMode()
{
  window.localStorage.setItem("mode", toggleMode());
}

initMode();
document.getElementById(MODE_BTN_ID).onclick = toggleAndSetMode;
