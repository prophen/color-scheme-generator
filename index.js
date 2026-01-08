fetch("https://www.thecolorapi.com/scheme?hex=0047AB&mode=analogic&count=5")
  .then((response) => response.json())
  .then((data) => console.log(data));
