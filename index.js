import init, {
  getState,
  openField,
  toggleFlag,
} from "./pkg/minesweeper_wasm.js";

async function main() {
  await init();
  console.log(getState());
  render();
}
function render() {
  let root = document.getElementById("root");
  root.innerText = "";

  let data = getState()
    .split("\n")
    .map((row) => row.trim().split(/\s+/));

  root.style.display = "inline-grid";
  root.style.gridTemplate = `repeat(${data.length}, auto) / repeat(${data[0].length}, auto)`;

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      let cell = document.createElement("a");
      cell.classList.add("cell");
      cell.innerText = data[y][x];
      cell.href = "#";

      cell.addEventListener("click", (evnt) => {
        evnt.preventDefault();
        openField(x, y);
        render();
      });

      cell.addEventListener("contextmenu", (evnt) => {
        evnt.preventDefault();
        toggleFlag(x, y);
        render();
      });

      root.appendChild(cell);
    }
  }
}

main();
