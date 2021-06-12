let generatedColors: string[] = []

function getRandomColor() {
  const makeColorCode = '0123456789ABCDEF';
  let colorCode = '#';
  for (var count = 0; count < 6; count++) {
     colorCode += makeColorCode[Math.floor(Math.random() * 16)];
  }

  generatedColors.push(colorCode);
  return colorCode;
}

function getGeneratedColors() {
  return generatedColors.reverse().pop()
}

export { getRandomColor, getGeneratedColors }
