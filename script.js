const ids = ["r1", "r2", "r3", "r4", "r5", "r6"];
const inputs = ids.map((id) => document.getElementById(id));
const calcBtn = document.getElementById("calcBtn");
const clearBtn = document.getElementById("clearBtn");
const resultsEl = document.getElementById("results");

calcBtn.addEventListener("click", () => {
  const values = inputs
    .map((inp) => parseFloat(inp.value))
    .filter((v) => !isNaN(v) && v > 0);

  resultsEl.innerHTML = "";

  if (!values.length) {
    resultsEl.innerHTML = "<li>Please enter at least one positive resistor value.</li>";
    return;
  }

  // Series: sum of all
  const seriesReq = values.reduce((sum, r) => sum + r, 0);

  // Parallel: 1/R_eq = sum(1/Ri)
  let invSum = 0;
  values.forEach((r) => {
    invSum += 1 / r;
  });
  const parallelReq = invSum > 0 ? 1 / invSum : NaN;

  const lines = [];
  lines.push(`Number of resistors: ${values.length}`);
  lines.push(`Series equivalent R_eq(series) ≈ ${seriesReq.toFixed(4)} Ω`);
  if (!isNaN(parallelReq)) {
    lines.push(`Parallel equivalent R_eq(parallel) ≈ ${parallelReq.toFixed(4)} Ω`);
  } else {
    lines.push("Parallel equivalent could not be computed.");
  }

  resultsEl.innerHTML = lines.map((t) => `<li>${t}</li>`).join("");
});

clearBtn.addEventListener("click", () => {
  inputs.forEach((inp) => (inp.value = ""));
  resultsEl.innerHTML = "";
});
