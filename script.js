
const $ = (id) => document.getElementById(id);

let actual = "cupboard";
let sanaBelief = "drawer";

function titleCase(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function updateScene() {
  $("chocolate").classList.toggle(
    "in-drawer",
    actual === "drawer"
  );

  $("moveDrawer").classList.toggle(
    "active",
    actual === "drawer"
  );

  $("moveCupboard").classList.toggle(
    "active",
    actual === "cupboard"
  );

  $("realityValue").textContent = titleCase(actual);
  $("youValue").textContent = titleCase(actual);
  $("beliefValue").textContent = titleCase(sanaBelief);

  $("sanaThought").innerHTML =
    sanaBelief === "drawer"
      ? "I left it<br>in the drawer."
      : "I saw it move<br>to the cupboard.";

  $("sceneChip").textContent =
    $("sawMove").checked
      ? "MOVE WAS WITNESSED"
      : "SANA IS UNAWARE";

  $("beliefValue").style.color =
    sanaBelief === actual
      ? "var(--mint)"
      : "var(--yellow)";

  $("feedback").className = "feedback";
  $("feedback").textContent =
    "SELECT A PREDICTION TO CONTINUE";

  document.querySelectorAll(".answer").forEach(
    button => button.style.borderColor = ""
  );
}

function moveTo(location) {
  actual = location;

  if ($("sawMove").checked) {
    sanaBelief = location;
  }

  updateScene();
}

$("moveDrawer").addEventListener("click", () => {
  moveTo("drawer");
});

$("moveCupboard").addEventListener("click", () => {
  moveTo("cupboard");
});

$("sawMove").addEventListener("change", () => {
  sanaBelief = $("sawMove").checked
    ? actual
    : "drawer";

  updateScene();
});

document.querySelectorAll(".answer").forEach(button => {
  button.addEventListener("click", () => {
    const choice = button.dataset.answer;
    const correct = choice === sanaBelief;

    $("feedback").className =
      "feedback " + (correct ? "good" : "bad");

    $("feedback").textContent = correct
      ? "✓ CORRECT — YOU TRACKED SANA'S BELIEF."
      : "↗ NOT QUITE — SEPARATE HER BELIEF FROM REALITY.";

    document.querySelectorAll(".answer").forEach(
      b => b.style.borderColor = ""
    );

    button.style.borderColor = correct
      ? "var(--mint)"
      : "var(--coral)";
  });
});

$("nextExperiment").addEventListener("click", () => {
  $("experimentTwo").classList.remove("hidden");
  $("experimentTwo").scrollIntoView({
    behavior: "smooth"
  });
  $("stepCount").textContent = "02";
  $("progressText").textContent = "EXPERIMENT 2 OF 3";
});

function updateWitness() {
  const saw = $("leoSaw").checked;

  $("leoKnowledge").textContent = saw
    ? "Believes: blue box"
    : "Believes: red box";

  $("leoMeter").style.width = saw ? "95%" : "45%";
}

$("leoSaw").addEventListener("change", updateWitness);

$("mayaQuestion").addEventListener("click", () => {
  $("witnessFeedback").textContent =
    "MAYA: I put the coin in the red box. " +
    "She did not witness the move.";
});

$("leoQuestion").addEventListener("click", () => {
  $("witnessFeedback").textContent =
    $("leoSaw").checked
      ? "LEO: I saw the coin move to the blue box."
      : "LEO: I think the coin is in the red box.";
});

$("toAgent").addEventListener("click", () => {
  $("experimentThree").classList.remove("hidden");

  $("experimentThree").scrollIntoView({
    behavior: "smooth"
  });

  $("realityAgent").textContent = titleCase(actual);
  $("mindAgent").textContent = titleCase(sanaBelief);
});

$("runComparison").addEventListener("click", () => {
  const realityCorrect = actual === sanaBelief;

  $("realityAgent").textContent = titleCase(actual);
  $("mindAgent").textContent = titleCase(sanaBelief);

  $("realityStatus").textContent = realityCorrect
    ? "MATCHES SANA'S BELIEF"
    : "IGNORES SANA'S INFORMATION";

  $("mindStatus").textContent =
    "PREDICTS FROM SANA'S BELIEF";

  $("comparisonResult").textContent = realityCorrect
    ? "Both agents predict the same location. " +
      "Matching an answer alone cannot reveal " +
      "which reasoning strategy was used."
    : "The predictions differ. The reality-first " +
      "agent predicts " + titleCase(actual) +
      ", while the belief-tracking agent predicts " +
      titleCase(sanaBelief) + ".";
});

$("restart").addEventListener("click", () => {
  actual = "cupboard";
  sanaBelief = "drawer";

  $("sawMove").checked = false;
  $("leoSaw").checked = false;

  updateScene();
  updateWitness();

  $("experimentTwo").classList.add("hidden");
  $("experimentThree").classList.add("hidden");

  $("stepCount").textContent = "01";
  $("progressText").textContent = "EXPERIMENT 1 OF 3";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

updateScene();
updateWitness();
