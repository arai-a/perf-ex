async function findFilter() {
  for (let i = 0; i < 100; i++) {
    for (const input of document.getElementsByTagName("input")){
      if (input.getAttribute("placeholder") &&
          input.getAttribute("placeholder").includes("linux tp")) {
        return input;
      }
    }

    await new Promise(r => setTimeout(r, 1000));
  }
  return null;
}

function removeGenerated() {
  for (const input of [...document.getElementsByClassName("ex-form-generated")]){
    input.remove();
  }
}

removeGenerated();

async function run() {
  const filter = await findFilter();
  if (!filter) {
    return;
  }
  const list = document.createElement("datalist");
  list.id = "ex-form-presets";
  const option = document.createElement("option");
  option.value = "confidence replayed recording-proportion-used";
  list.appendChild(option);
  filter.after(list);

  const exFilter = document.createElement("input");
  exFilter.type = "text";
  exFilter.classList.add("form-control");
  exFilter.classList.add("ex-form-generated");
  exFilter.setAttribute("placeholder", "exclude");
  exFilter.setAttribute("list", "ex-form-presets");
  exFilter.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      doFilter(exFilter.value);
    }
  });
  filter.after(exFilter);

  function ex(terms, text) {
    for (const word of terms) {
      if (text.includes(word)) {
        return true;
      }
    }

    return false;
  }

  function doFilter(term) {
    const terms = term ? term.split(/ +/) : [];

    for (const table of document.getElementsByClassName("compare-table")) {
      const left = table.getElementsByClassName("text-left")[0];
      const span = table.getElementsByTagName("span")[0];
      if (ex(terms, span.textContent)) {
        table.style.display = "none";
      } else {
        table.style.display = "";
      }
    }
  }
}
run();
