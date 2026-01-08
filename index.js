let schemeArr = [];

const generateBtn = document.getElementById("generate-scheme");

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
