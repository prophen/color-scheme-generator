let schemeArr = [];

const generateBtn = document.getElementById("generate-scheme");
const schemeSelect = document.getElementById("scheme-select");
const schemeTrigger = schemeSelect.querySelector(".select-trigger");
const schemeListbox = schemeSelect.querySelector(".select-options");
const schemeValue = document.getElementById("scheme-value");
const schemeInput = document.getElementById("scheme-mode");
const schemeOptions = Array.from(
  schemeListbox.querySelectorAll('[role="option"]')
);
let activeIndex = schemeOptions.findIndex(
  (option) => option.getAttribute("aria-selected") === "true"
);

function displayColors() {
  const colorsContainer = document.querySelector(".colors");
  schemeArr.forEach((colorObj, index) => {
    const colorDiv = colorsContainer.querySelector(`.color-${index}`);
    colorDiv.style.backgroundColor = colorObj.hex.value;
  });
  const hexCodesContainer = document.querySelector(".hex-codes");
  schemeArr.forEach((colorObj, index) => {
    const hexDiv = hexCodesContainer.querySelectorAll(".hex-code")[index];
    hexDiv.textContent = colorObj.hex.value;
  });
}
function setActiveOption(index) {
  const clampedIndex = Math.max(0, Math.min(index, schemeOptions.length - 1));
  activeIndex = clampedIndex;
  schemeOptions.forEach((option, optionIndex) => {
    option.classList.toggle("is-active", optionIndex === clampedIndex);
  });
  const activeOption = schemeOptions[clampedIndex];
  schemeListbox.setAttribute("aria-activedescendant", activeOption.id);
  activeOption.scrollIntoView({ block: "nearest" });
}
function openSelect() {
  schemeSelect.classList.add("is-open");
  schemeTrigger.setAttribute("aria-expanded", "true");
  schemeListbox.focus();
  setActiveOption(activeIndex >= 0 ? activeIndex : 0);
}
function closeSelect({ focusTrigger = true } = {}) {
  schemeSelect.classList.remove("is-open");
  schemeTrigger.setAttribute("aria-expanded", "false");
  schemeListbox.removeAttribute("aria-activedescendant");
  if (focusTrigger) {
    schemeTrigger.focus();
  }
}
function selectOption(option) {
  const newValue = option.dataset.value;
  schemeOptions.forEach((item) => {
    item.setAttribute("aria-selected", item === option ? "true" : "false");
  });
  schemeValue.textContent = option.textContent.trim();
  schemeInput.value = newValue;
  activeIndex = schemeOptions.indexOf(option);
  closeSelect({ focusTrigger: true });
}

schemeTrigger.addEventListener("click", () => {
  if (schemeSelect.classList.contains("is-open")) {
    closeSelect({ focusTrigger: false });
  } else {
    openSelect();
  }
});

schemeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectOption(option);
  });
});

schemeTrigger.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    openSelect();
  }
});

schemeListbox.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      setActiveOption(activeIndex + 1);
      break;
    case "ArrowUp":
      event.preventDefault();
      setActiveOption(activeIndex - 1);
      break;
    case "Home":
      event.preventDefault();
      setActiveOption(0);
      break;
    case "End":
      event.preventDefault();
      setActiveOption(schemeOptions.length - 1);
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      selectOption(schemeOptions[activeIndex]);
      break;
    case "Escape":
      event.preventDefault();
      closeSelect({ focusTrigger: true });
      break;
    default:
      break;
  }
});

document.addEventListener("click", (event) => {
  if (!schemeSelect.contains(event.target)) {
    closeSelect({ focusTrigger: false });
  }
});

generateBtn.addEventListener("click", () => {
  const baseColor = document.getElementById("base-color").value.slice(1);
  const schemeMode = document.getElementById("scheme-mode").value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${schemeMode}&count=5`
  )
    .then((response) => response.json())
    .then((data) => {
      schemeArr = data.colors;
      displayColors();
    });
});
