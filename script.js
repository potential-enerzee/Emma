(function () {
  "use strict";

  const config = window.LOVE_STORY;
  const scenes = [...document.querySelectorAll(".scene")];
  const progressLabel = document.querySelector(".progress-label");
  const progressFill = document.querySelector(".progress-fill");
  let currentScene = "welcome";

  function fillPersonalText() {
    document.title = `For ${config.herName} — with love`;
    document.querySelectorAll("[data-her-name]").forEach((element) => {
      element.textContent = config.herName;
    });
    document.querySelectorAll("[data-your-name]").forEach((element) => {
      element.textContent = element.classList.contains("secret-signoff")
        ? `— ${config.yourName}`
        : config.yourName;
    });
    document.querySelector("[data-intro]").textContent = config.intro;
    document.querySelector("[data-secret-message]").textContent = config.secretMessage;
    document.querySelector("[data-final-question]").textContent = config.finalQuestion;
    document.querySelector("[data-final-note]").textContent = config.finalNote;
    document.querySelector("[data-success-message]").textContent = config.successMessage;
    document.querySelector(".brand-mark").textContent = config.herName.charAt(0).toUpperCase();
  }

  function goTo(sceneId) {
    if (sceneId === currentScene) return;
    const oldScene = document.getElementById(currentScene);
    const nextScene = document.getElementById(sceneId);
    if (!nextScene) return;

    if (currentScene === "word-game" && sceneId !== "word-game") {
      document.getElementById("monkey-laugh-video")?.pause();
    }

    oldScene.classList.add("leaving");
    oldScene.classList.remove("active");
    window.setTimeout(() => oldScene.classList.remove("leaving"), 600);
    nextScene.classList.add("active");
    currentScene = sceneId;

    const step = Number(nextScene.dataset.step || 1);
    progressLabel.textContent = `${String(step).padStart(2, "0")} / 07`;
    progressFill.style.width = `${(step / 7) * 100}%`;

    if (sceneId === "scratch") window.setTimeout(setupScratchCard, 80);
    if (sceneId === "quiz") renderQuestion();
    nextScene.querySelector("h1, h2")?.focus({ preventScroll: true });
  }

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => goTo(button.dataset.go));
  });

  document.querySelector(".brand").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
  });

  // Opening hand-catch interaction
  const welcomeScene = document.getElementById("welcome");
  const catchStage = document.getElementById("catch-stage");
  const welcomeNext = document.querySelector(".welcome-next");
  const welcomeIntro = document.querySelector("[data-intro]");
  const uppiesMoment = document.getElementById("uppies-moment");
  const uppiesVideo = document.getElementById("uppies-video");
  const uppiesNote = document.getElementById("uppies-note");
  const videoNext = document.getElementById("video-next");
  let handsCaught = false;

  function positionReachingHand(event) {
    if (handsCaught || event.pointerType === "touch") return;
    const rect = catchStage.getBoundingClientRect();
    const position = ((event.clientX - rect.left) / rect.width) * 100;
    const clampedPosition = Math.max(13, Math.min(87, position));
    catchStage.style.setProperty("--hand-x", `${clampedPosition}%`);
  }

  function catchHands() {
    if (handsCaught) return;
    handsCaught = true;
    catchStage.classList.add("caught");
    welcomeScene.classList.add("caught");
    welcomeIntro.textContent =
      config.caughtIntro || "You reached back. That’s how every good story begins.";
    catchStage.setAttribute("aria-label", "You caught his hands with two fingers");
    catchStage.disabled = true;
    navigator.vibrate?.([25, 40, 25]);

    uppiesMoment.classList.add("visible");
    uppiesMoment.setAttribute("aria-hidden", "false");
    uppiesVideo.currentTime = 0;
    const playback = uppiesVideo.play();
    playback?.catch(() => {
      uppiesNote.textContent = "Tap play to watch our uppies moment ♥";
    });
  }

  function finishUppies(message = "Worth the catch, don’t you think?") {
    uppiesNote.textContent = message;
    videoNext.hidden = false;
    welcomeNext.disabled = false;
    videoNext.focus({ preventScroll: true });
  }

  uppiesVideo.addEventListener("ended", () => finishUppies());
  uppiesVideo.addEventListener("error", () => {
    finishUppies("The video couldn’t load, but you still caught me ♥");
  });

  catchStage.addEventListener("pointermove", positionReachingHand);
  catchStage.addEventListener("pointerdown", positionReachingHand);
  catchStage.addEventListener("click", catchHands);

  // Swipe cards
  const cardStack = document.getElementById("card-stack");
  const swipeComplete = document.getElementById("swipe-complete");
  const swipeHint = document.getElementById("swipe-hint");
  const laughMemory = document.getElementById("laugh-memory");
  const memoryClose = document.getElementById("memory-close");
  const memoryContinue = document.getElementById("memory-continue");
  const energyMemory = document.getElementById("energy-memory");
  const energyClose = document.getElementById("energy-close");
  const energyContinue = document.getElementById("energy-continue");
  const energyVideo = document.getElementById("energy-video");
  const energyActionVideo = document.getElementById("energy-action-video");
  const energyNote = document.getElementById("energy-note");
  const littleMemory = document.getElementById("little-memory");
  const littleClose = document.getElementById("little-close");
  const littleContinue = document.getElementById("little-continue");
  const simplyUsMemory = document.getElementById("simply-us-memory");
  const usScratchSteps = [...document.querySelectorAll(".us-scratch-step")];
  const usStepDots = [...document.querySelectorAll(".us-step-progress i")];
  const usStepLabel = document.querySelector(".us-step-label");
  const usFinish = document.getElementById("us-finish");
  let remainingCards = config.reasons.length;

  function openLaughMemory() {
    laughMemory.classList.add("visible");
    laughMemory.setAttribute("aria-hidden", "false");
    window.setTimeout(() => memoryContinue.focus({ preventScroll: true }), 350);
  }

  function closeLaughMemory() {
    laughMemory.classList.remove("visible");
    laughMemory.setAttribute("aria-hidden", "true");
    swipeHint.querySelector("span:nth-child(2)").textContent = "keep swiping";
  }

  function openEnergyMemory() {
    energyMemory.classList.add("visible");
    energyMemory.setAttribute("aria-hidden", "false");
    energyVideo.currentTime = 0;
    energyActionVideo.currentTime = 0;
    energyNote.textContent = "Somehow, every adventure stores a little more energy for our next one.";
    const playback = energyVideo.play();
    energyActionVideo.play().catch(() => {});
    playback?.catch(() => {
      energyNote.textContent = "Tap play to set our potential energy in motion ♥";
    });
    window.setTimeout(() => energyContinue.focus({ preventScroll: true }), 500);
  }

  function closeEnergyMemory() {
    energyVideo.pause();
    energyActionVideo.pause();
    energyMemory.classList.remove("visible");
    energyMemory.setAttribute("aria-hidden", "true");
    swipeHint.querySelector("span:nth-child(2)").textContent = "keep swiping";
  }

  function openLittleMemory() {
    littleMemory.classList.add("visible");
    littleMemory.setAttribute("aria-hidden", "false");
    window.setTimeout(() => littleContinue.focus({ preventScroll: true }), 400);
  }

  function closeLittleMemory() {
    littleMemory.classList.remove("visible");
    littleMemory.setAttribute("aria-hidden", "true");
    swipeHint.querySelector("span:nth-child(2)").textContent = "keep swiping";
  }

  function openSimplyUsMemory() {
    simplyUsMemory.classList.add("visible");
    simplyUsMemory.setAttribute("aria-hidden", "false");
    showUsScratchStep(0);
  }

  function closeSimplyUsMemory() {
    simplyUsMemory.classList.remove("visible");
    simplyUsMemory.setAttribute("aria-hidden", "true");
    document.querySelector("#swipe-complete button")?.focus({ preventScroll: true });
  }

  function showUsScratchStep(index) {
    usScratchSteps.forEach((step, stepIndex) => {
      step.classList.toggle("active", stepIndex === index);
    });
    usStepDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
      dot.classList.toggle("done", dotIndex < index);
    });
    usStepLabel.textContent = `${index + 1} / ${usScratchSteps.length}`;
    window.setTimeout(() => setupUsScratchCanvas(index), 60);
  }

  function setupUsScratchCanvas(index) {
    const step = usScratchSteps[index];
    const canvas = step.querySelector(".us-scratch-canvas");
    if (canvas.dataset.ready === "true") return;

    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.scale(ratio, ratio);

    const covers = [
      ["#df7267", "#bd5048"],
      ["#bca6d2", "#977caf"],
      ["#aabca4", "#7f9979"],
      ["#e8c96f", "#d19e52"],
    ];
    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, covers[index][0]);
    gradient.addColorStop(1, covers[index][1]);
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);

    context.fillStyle = "rgba(255,255,255,.16)";
    for (let i = 0; i < 22; i += 1) {
      const x = ((i * 83) % Math.max(1, rect.width - 30)) + 15;
      const y = ((i * 57) % Math.max(1, rect.height - 30)) + 15;
      context.beginPath();
      context.arc(x, y, 3 + (i % 4), 0, Math.PI * 2);
      context.fill();
    }

    context.fillStyle = "rgba(255,255,255,.94)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `800 ${Math.max(12, Math.min(17, rect.width / 48))}px Inter, sans-serif`;
    context.fillText(`SCRATCH ${index + 1} OF ${usScratchSteps.length}`, rect.width / 2, rect.height / 2 - 12);
    context.font = `${Math.max(23, Math.min(36, rect.width / 24))}px Georgia, serif`;
    context.fillText(index === 3 ? "one last memory ♥" : "three memories underneath ✦", rect.width / 2, rect.height / 2 + 26);
    context.setTransform(1, 0, 0, 1, 0, 0);

    let scratchingThisCanvas = false;
    let checks = 0;

    function erase(event) {
      if (!scratchingThisCanvas || canvas.classList.contains("cleared")) return;
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = canvas.width / bounds.width;
      const x = (event.clientX - bounds.left) * pixelRatio;
      const y = (event.clientY - bounds.top) * pixelRatio;
      context.save();
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, Math.max(24, bounds.width * 0.045) * pixelRatio, 0, Math.PI * 2);
      context.fill();
      context.restore();
      checks += 1;
      if (checks % 7 === 0) checkUsScratchProgress(step, canvas, context);
    }

    canvas.addEventListener("pointerdown", (event) => {
      scratchingThisCanvas = true;
      canvas.setPointerCapture(event.pointerId);
      erase(event);
    });
    canvas.addEventListener("pointermove", erase);
    canvas.addEventListener("pointerup", (event) => {
      scratchingThisCanvas = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      checkUsScratchProgress(step, canvas, context);
    });
    canvas.addEventListener("pointercancel", () => { scratchingThisCanvas = false; });
    canvas.dataset.ready = "true";
  }

  function checkUsScratchProgress(step, canvas, context) {
    if (canvas.classList.contains("cleared")) return;
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < pixels.length; i += 64) {
      if (pixels[i] < 80) clear += 1;
    }
    const percent = (clear / (pixels.length / 64)) * 100;
    if (percent >= 38) {
      canvas.classList.add("cleared");
      const footer = step.querySelector(".us-scratch-footer");
      footer.querySelector(":scope > span").textContent = "Memories revealed ♥";
      footer.querySelector("button").hidden = false;
    }
  }

  memoryClose.addEventListener("click", closeLaughMemory);
  memoryContinue.addEventListener("click", closeLaughMemory);
  energyClose.addEventListener("click", closeEnergyMemory);
  energyContinue.addEventListener("click", closeEnergyMemory);
  littleClose.addEventListener("click", closeLittleMemory);
  littleContinue.addEventListener("click", closeLittleMemory);
  document.querySelectorAll("[data-us-next]").forEach((button) => {
    button.addEventListener("click", () => showUsScratchStep(Number(button.dataset.usNext)));
  });
  usFinish.addEventListener("click", closeSimplyUsMemory);
  energyVideo.addEventListener("ended", () => {
    energyNote.textContent = "Potential energy transformed into one of my favorite memories.";
  });
  energyVideo.addEventListener("error", () => {
    energyNote.textContent = "The video couldn’t load, but our formula still works: P + E ♥";
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && laughMemory.classList.contains("visible")) {
      closeLaughMemory();
    }
    if (event.key === "Escape" && energyMemory.classList.contains("visible")) {
      closeEnergyMemory();
    }
    if (event.key === "Escape" && littleMemory.classList.contains("visible")) {
      closeLittleMemory();
    }
  });

  function makeCard(reason, index) {
    const hasLaughMemory = reason.number === "01";
    const hasEnergyMemory = reason.number === "02";
    const hasLittleMemory = reason.number === "03";
    const hasSimplyUsMemory = reason.number === "04";
    const hasSpecialMemory = hasLaughMemory || hasEnergyMemory || hasLittleMemory || hasSimplyUsMemory;
    const card = document.createElement("article");
    card.className = `reason-card ${reason.color || "coral"}${hasSpecialMemory ? " memory-card" : ""}`;
    card.style.zIndex = String(index + 1);
    if (hasSpecialMemory) {
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute(
        "aria-label",
        hasLaughMemory
          ? "Our laugh. Tap or drag to open this memory."
          : hasEnergyMemory
            ? "Potential Energy. Tap or drag to open this memory."
            : hasLittleMemory
              ? "The little things. Tap or drag to open these memories."
              : "Simply us. Tap or drag to begin four scratch reveals.",
      );
    }
    card.innerHTML = `
      <span class="card-number">REASON ${reason.number || String(index + 1).padStart(2, "0")}</span>
      ${hasSpecialMemory ? '<span class="memory-hint">tap or drag me</span>' : ""}
      <div class="card-doodle ${reason.doodle || "heart"}" aria-hidden="true"></div>
      <h3>${escapeHTML(reason.title)}</h3>
      <p>${escapeHTML(reason.text)}</p>
    `;

    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    card.addEventListener("pointerdown", (event) => {
      if (card !== cardStack.lastElementChild) return;
      dragging = true;
      startX = event.clientX;
      card.classList.add("dragging");
      card.setPointerCapture(event.pointerId);
    });

    card.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      deltaX = event.clientX - startX;
      const rotation = deltaX / 14;
      card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
    });

    function sendCardAway(direction, afterSwipe) {
      if (card.classList.contains("swiped")) return;
      card.classList.add("swiped");
      card.style.transform = `translateX(${direction * 120}vw) rotate(${direction * 28}deg)`;
      window.setTimeout(() => {
        card.remove();
        remainingCards -= 1;
        if (remainingCards === 0) {
          swipeHint.style.visibility = "hidden";
          swipeComplete.classList.add("visible");
        }
        afterSwipe?.();
      }, 350);
    }

    function release(event) {
      if (!dragging) return;
      dragging = false;
      card.classList.remove("dragging");
      if (card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);

      if (event.type === "pointercancel") {
        card.style.transform = "";
        deltaX = 0;
        return;
      }

      if (hasLaughMemory) {
        const direction = deltaX < -10 ? -1 : 1;
        sendCardAway(direction, openLaughMemory);
        deltaX = 0;
        return;
      }

      if (hasEnergyMemory) {
        const direction = deltaX < -10 ? -1 : 1;
        openEnergyMemory();
        sendCardAway(direction);
        deltaX = 0;
        return;
      }


      if (hasLittleMemory) {
        const direction = deltaX < -10 ? -1 : 1;
        sendCardAway(direction, openLittleMemory);
        deltaX = 0;
        return;
      }

      if (hasSimplyUsMemory) {
        const direction = deltaX < -10 ? -1 : 1;
        sendCardAway(direction, openSimplyUsMemory);
        deltaX = 0;
        return;
      }

      if (Math.abs(deltaX) > 80) {
        const direction = deltaX < 0 ? -1 : 1;
        sendCardAway(direction);
      } else {
        card.style.transform = "";
      }
      deltaX = 0;
    }

    card.addEventListener("pointerup", release);
    card.addEventListener("pointercancel", release);
    if (hasSpecialMemory) {
      card.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ") && card === cardStack.lastElementChild) {
          event.preventDefault();
          if (hasLaughMemory) {
            sendCardAway(1, openLaughMemory);
          } else if (hasEnergyMemory) {
            openEnergyMemory();
            sendCardAway(1);
          } else if (hasLittleMemory) {
            sendCardAway(1, openLittleMemory);
          } else {
            sendCardAway(1, openSimplyUsMemory);
          }
        }
      });
    }
    return card;
  }

  // Add them in reverse DOM order so reason 01 sits at the top of the stack.
  config.reasons
    .slice()
    .reverse()
    .forEach((reason, index) => cardStack.appendChild(makeCard(reason, index)));

  // Scratch card
  const scratchCanvas = document.getElementById("scratch-canvas");
  const scratchWrap = document.getElementById("scratch-wrap");
  const scratchPercent = document.getElementById("scratch-percent");
  const scratchNext = document.getElementById("scratch-next");
  let scratchReady = false;
  let scratching = false;
  let scratchChecks = 0;

  function setupScratchCard() {
    if (scratchReady) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    scratchCanvas.width = Math.floor(rect.width * ratio);
    scratchCanvas.height = Math.floor(rect.height * ratio);
    const context = scratchCanvas.getContext("2d", { willReadFrequently: true });
    context.scale(ratio, ratio);

    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#c9b6d9");
    gradient.addColorStop(1, "#ad96c2");
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);

    context.fillStyle = "rgba(255,255,255,.9)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `700 ${Math.max(12, Math.min(16, rect.width / 36))}px Inter, sans-serif`;
    context.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 - 7);
    context.font = "24px Georgia, serif";
    context.fillText("✦  ✦  ✦", rect.width / 2, rect.height / 2 + 28);
    // Pointer coordinates below are converted to physical pixels, so remove the
    // setup transform before the erasing phase.
    context.setTransform(1, 0, 0, 1, 0, 0);
    scratchReady = true;
  }

  function scratchAt(event) {
    if (!scratching || scratchCanvas.classList.contains("cleared")) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const ratio = scratchCanvas.width / rect.width;
    const x = (event.clientX - rect.left) * ratio;
    const y = (event.clientY - rect.top) * ratio;
    const context = scratchCanvas.getContext("2d", { willReadFrequently: true });
    context.save();
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 27 * ratio, 0, Math.PI * 2);
    context.fill();
    context.restore();

    scratchChecks += 1;
    if (scratchChecks % 7 === 0) updateScratchProgress(context);
  }

  function updateScratchProgress(context) {
    const pixels = context.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height).data;
    let clear = 0;
    for (let i = 3; i < pixels.length; i += 48) {
      if (pixels[i] < 80) clear += 1;
    }
    const totalSampled = pixels.length / 48;
    const percent = Math.min(100, Math.round((clear / totalSampled) * 100));
    scratchPercent.textContent = `${percent}% revealed`;
    if (percent >= 42) {
      scratchCanvas.classList.add("cleared");
      scratchPercent.textContent = "Secret revealed";
      scratchNext.classList.remove("hidden");
    }
  }

  scratchCanvas.addEventListener("pointerdown", (event) => {
    scratching = true;
    scratchWrap.classList.add("started");
    scratchCanvas.setPointerCapture(event.pointerId);
    scratchAt(event);
  });
  scratchCanvas.addEventListener("pointermove", scratchAt);
  scratchCanvas.addEventListener("pointerup", (event) => {
    scratching = false;
    if (scratchCanvas.hasPointerCapture(event.pointerId)) scratchCanvas.releasePointerCapture(event.pointerId);
    updateScratchProgress(scratchCanvas.getContext("2d", { willReadFrequently: true }));
  });
  scratchCanvas.addEventListener("pointercancel", () => { scratching = false; });

  // Crack the code: three Wordle rounds
  const wordRounds = config.wordGame?.rounds || [
    { answer: "GREEN", clue: "What colour has your heart claimed as its favourite?" },
    { answer: "TINKY", clue: "What alternative name have I saved you under in my contacts—the one only we know?", lateHint: "It starts with T." },
    { answer: "MONKEY", clue: "Which animal do I associate with your cutest chaotic energy?" },
  ];
  const wordGameCard = document.getElementById("word-game-card");
  const wordBoard = document.getElementById("word-board");
  const wordKeyboard = document.getElementById("word-keyboard");
  const wordMessage = document.getElementById("word-message");
  const wordHint = document.getElementById("word-hint");
  const wordRoundLabel = document.getElementById("word-round");
  const wordRoundDots = document.getElementById("word-round-dots");
  const wordNext = document.getElementById("word-next");
  const wordNextLabel = document.getElementById("word-next-label");
  const monkeyReward = document.getElementById("monkey-reward");
  const monkeyLaughVideo = document.getElementById("monkey-laugh-video");
  let wordRoundIndex = 0;
  let wordRow = 0;
  let wordGuess = "";
  let wordLocked = false;
  let wordFinished = false;

  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", ["ENTER", ..."ZXCVBNM", "BACK"]];
  keyboardRows.forEach((keys) => {
    const row = document.createElement("div");
    row.className = "word-key-row";
    [...keys].forEach((key) => {
      const button = document.createElement("button");
      button.className = `word-key${key.length > 1 ? " wide" : ""}`;
      button.type = "button";
      button.dataset.key = key;
      button.textContent = key === "BACK" ? "⌫" : key;
      button.setAttribute("aria-label", key === "BACK" ? "Backspace" : key);
      button.addEventListener("click", () => handleWordKey(key));
      row.appendChild(button);
    });
    wordKeyboard.appendChild(row);
  });

  function currentWordRound() {
    return wordRounds[wordRoundIndex];
  }

  function renderWordRound() {
    const round = currentWordRound();
    const answer = round.answer.toUpperCase();
    wordRow = 0;
    wordGuess = "";
    wordLocked = false;
    wordFinished = false;
    wordBoard.replaceChildren();
    wordBoard.style.setProperty("--word-length", answer.length);
    for (let index = 0; index < answer.length * 6; index += 1) {
      const tile = document.createElement("span");
      tile.className = "word-tile";
      tile.setAttribute("aria-hidden", "true");
      wordBoard.appendChild(tile);
    }
    wordKeyboard.querySelectorAll(".word-key").forEach((key) => {
      key.classList.remove("correct", "present", "absent");
      key.disabled = false;
    });
    wordRoundLabel.textContent = `Code ${wordRoundIndex + 1} of ${wordRounds.length}`;
    wordRoundDots.textContent = wordRounds
      .map((_, index) => index <= wordRoundIndex ? "●" : "○")
      .join(" ");
    wordHint.textContent = round.clue;
    wordMessage.textContent = "Tap the letters to make your first guess.";
    wordNext.hidden = true;
    wordNextLabel.textContent = wordRoundIndex === wordRounds.length - 1
      ? "Continue our adventure"
      : "Next little mystery";
    monkeyReward.hidden = true;
    wordGameCard.classList.remove("showing-reward");
    monkeyLaughVideo.pause();
    monkeyLaughVideo.currentTime = 0;
  }

  function paintWordGuess() {
    const answerLength = currentWordRound().answer.length;
    const rowStart = wordRow * answerLength;
    for (let index = 0; index < answerLength; index += 1) {
      const tile = wordBoard.children[rowStart + index];
      tile.textContent = wordGuess[index] || "";
      tile.classList.toggle("filled", index < wordGuess.length);
    }
  }

  function keyboardStatus(letter, status) {
    const key = wordKeyboard.querySelector(`[data-key="${letter}"]`);
    if (!key || key.classList.contains("correct")) return;
    if (status === "correct" || !key.classList.contains("present")) {
      key.classList.remove("present", "absent");
      key.classList.add(status);
    }
  }

  function scoreWordGuess(guess, answer) {
    const statuses = Array(answer.length).fill("absent");
    const remaining = {};
    [...answer].forEach((letter, index) => {
      if (guess[index] === letter) statuses[index] = "correct";
      else remaining[letter] = (remaining[letter] || 0) + 1;
    });
    [...guess].forEach((letter, index) => {
      if (statuses[index] === "correct") return;
      if (remaining[letter] > 0) {
        statuses[index] = "present";
        remaining[letter] -= 1;
      }
    });
    return statuses;
  }

  function submitWordGuess() {
    const round = currentWordRound();
    const answer = round.answer.toUpperCase();
    if (wordGuess.length < answer.length) {
      wordMessage.textContent = `${answer.length} letters, detective!`;
      wordBoard.classList.remove("nudge");
      void wordBoard.offsetWidth;
      wordBoard.classList.add("nudge");
      return;
    }

    wordLocked = true;
    const statuses = scoreWordGuess(wordGuess, answer);
    const rowStart = wordRow * answer.length;
    statuses.forEach((status, index) => {
      const tile = wordBoard.children[rowStart + index];
      tile.classList.remove("filled");
      tile.classList.add("reveal", status);
      tile.style.setProperty("--tile-delay", `${index * 75}ms`);
      keyboardStatus(wordGuess[index], status);
    });

    const solved = wordGuess === answer;
    if (solved && answer === "MONKEY") {
      const playback = monkeyLaughVideo.play();
      playback?.catch(() => {
        wordMessage.textContent = "Correct! Tap play to hear your monkey representative laugh. 😂";
      });
    }
    window.setTimeout(() => {
      if (solved) {
        wordFinished = true;
        wordMessage.textContent = round.solved || `Correct—it was ${answer}! ♥`;
        wordHint.textContent = wordRoundIndex === wordRounds.length - 1
          ? "Case closed: cutest little monkey confirmed."
          : "Code cracked. My clever honey wins this round.";
        wordKeyboard.querySelectorAll("button").forEach((key) => { key.disabled = true; });
        if (answer === "MONKEY") {
          monkeyReward.hidden = false;
          wordGameCard.classList.add("showing-reward");
        }
        wordNext.hidden = false;
        navigator.vibrate?.([30, 40, 70]);
        return;
      }

      wordRow += 1;
      wordGuess = "";
      if (wordRow >= 6) {
        wordFinished = true;
        wordMessage.textContent = `The code was ${answer}. You still win—honey rules. ♥`;
        wordHint.textContent = wordRoundIndex === 1
          ? "Tinky: my tiny name for the person with the biggest place in my heart."
          : `Mystery solved: ${answer}.`;
        wordNext.hidden = false;
        return;
      }
      wordLocked = false;
      wordMessage.textContent = wordRow < 3
        ? "Cute guess. Try again!"
        : "Summon the couple telepathy—you’ve got this.";
      if (wordRoundIndex === 1 && wordRow >= 3 && round.lateHint) {
        wordHint.textContent = round.lateHint;
      }
    }, 650);
  }

  function handleWordKey(key) {
    if (wordLocked || wordFinished) return;
    if (key === "ENTER") {
      submitWordGuess();
      return;
    }
    if (key === "BACK") {
      wordGuess = wordGuess.slice(0, -1);
      paintWordGuess();
      return;
    }
    if (/^[A-Z]$/.test(key) && wordGuess.length < currentWordRound().answer.length) {
      wordGuess += key;
      paintWordGuess();
    }
  }

  wordNext.addEventListener("click", () => {
    if (wordRoundIndex < wordRounds.length - 1) {
      wordRoundIndex += 1;
      renderWordRound();
      return;
    }
    monkeyLaughVideo.pause();
    goTo("quiz");
  });

  renderWordRound();

  document.addEventListener("keydown", (event) => {
    if (currentScene !== "word-game") return;
    if (event.key === "Enter" || event.key === "Backspace" || /^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
    }
    if (event.key === "Enter") handleWordKey("ENTER");
    else if (event.key === "Backspace") handleWordKey("BACK");
    else if (/^[a-zA-Z]$/.test(event.key)) handleWordKey(event.key.toUpperCase());
  });

  // Quiz
  let questionIndex = 0;
  const quizCard = document.getElementById("quiz-card");
  const quizCount = document.getElementById("quiz-count");
  const quizQuestion = document.getElementById("quiz-question");
  const quizAnswers = document.getElementById("quiz-answers");

  function renderQuestion() {
    const item = config.questions[questionIndex];
    if (!item) return;
    quizCount.textContent = `Question ${questionIndex + 1} of ${config.questions.length}`;
    quizQuestion.textContent = item.question;
    quizAnswers.replaceChildren();
    item.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.className = "answer-button";
      button.textContent = answer;
      button.addEventListener("click", chooseAnswer);
      quizAnswers.appendChild(button);
    });
  }

  function chooseAnswer() {
    if (quizCard.classList.contains("switching")) return;
    if (questionIndex === config.questions.length - 1) {
      goTo("pack-game");
      return;
    }
    quizCard.classList.add("switching");
    window.setTimeout(() => {
      questionIndex += 1;
      renderQuestion();
    }, 190);
    window.setTimeout(() => quizCard.classList.remove("switching"), 430);
  }

  // Pack our adventure bag
  const packItems = document.getElementById("pack-items");
  const packedItems = document.getElementById("packed-items");
  const suitcase = document.getElementById("suitcase");
  const packCount = document.getElementById("pack-count");
  const packStatus = document.getElementById("pack-status");
  const packNext = document.getElementById("pack-next");
  let packedCount = 0;
  let packingComplete = false;
  const packReactions = {
    "pack-passports": "Responsible choice. Suspiciously responsible.",
    "pack-snacks": "The most important travel document: snacks.",
    "pack-camera": "For evidence that we actually went outside.",
    "pack-cuddles": "Excellent. These fit in every overhead compartment.",
    "pack-kiwi": "Kiwi has been promoted to breakfast supervisor. Muaaahh!",
    "pack-socks": "Forty-seven socks and somehow none of them match.",
  };

  function packItem(item) {
    if (!item || item.classList.contains("packed") || packingComplete) return;
    item.classList.add("packed");
    item.draggable = false;
    packedItems.appendChild(item);
    packedCount += 1;
    packCount.textContent = `${packedCount} / 4 essentials packed`;
    packStatus.textContent = packReactions[item.id];
    navigator.vibrate?.(25);

    if (packedCount === 4) {
      packingComplete = true;
      suitcase.classList.add("complete");
      packStatus.textContent = "Perfectly packed. Questionable choices, excellent adventure. ♥";
      packNext.hidden = false;
      packItems.querySelectorAll(".pack-item").forEach((remaining) => {
        remaining.disabled = true;
        remaining.draggable = false;
      });
      navigator.vibrate?.([30, 40, 60]);
    }
  }

  document.querySelectorAll(".pack-item").forEach((item) => {
    item.addEventListener("click", () => packItem(item));
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", item.id);
      event.dataTransfer.effectAllowed = "move";
      suitcase.classList.add("drag-over");
    });
    item.addEventListener("dragend", () => suitcase.classList.remove("drag-over"));
  });

  suitcase.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    suitcase.classList.add("drag-over");
  });
  suitcase.addEventListener("dragleave", () => suitcase.classList.remove("drag-over"));
  suitcase.addEventListener("drop", (event) => {
    event.preventDefault();
    suitcase.classList.remove("drag-over");
    packItem(document.getElementById(event.dataTransfer.getData("text/plain")));
  });

  // Hold to unlock
  const holdButton = document.getElementById("hold-button");
  const holdLabel = document.getElementById("hold-label");
  const ring = document.querySelector(".ring-progress");
  const ringLength = 339.292;
  let holding = false;
  let holdStart = 0;
  let holdFrame = 0;
  const holdDuration = 1800;

  function beginHold(event) {
    event.preventDefault();
    if (holding) return;
    holding = true;
    holdStart = performance.now();
    holdButton.classList.add("holding");
    holdButton.setPointerCapture?.(event.pointerId);
    holdFrame = requestAnimationFrame(updateHold);
  }

  function updateHold(now) {
    if (!holding) return;
    const progress = Math.min(1, (now - holdStart) / holdDuration);
    ring.style.strokeDashoffset = String(ringLength * (1 - progress));
    holdLabel.textContent = progress < 0.35 ? "keep holding" : progress < 0.78 ? "almost there" : "don't let go";
    if (progress >= 1) {
      holding = false;
      navigator.vibrate?.([30, 50, 30]);
      goTo("final");
      return;
    }
    holdFrame = requestAnimationFrame(updateHold);
  }

  function cancelHold() {
    if (!holding) return;
    holding = false;
    cancelAnimationFrame(holdFrame);
    holdButton.classList.remove("holding");
    ring.style.strokeDashoffset = String(ringLength);
    holdLabel.textContent = "hold me";
  }

  holdButton.addEventListener("pointerdown", beginHold);
  holdButton.addEventListener("pointerup", cancelHold);
  holdButton.addEventListener("pointercancel", cancelHold);
  holdButton.addEventListener("pointerleave", cancelHold);
  holdButton.addEventListener("keydown", (event) => {
    if ((event.key === " " || event.key === "Enter") && !holding) beginHold(event);
  });
  holdButton.addEventListener("keyup", cancelHold);

  // Celebration
  const finalActions = document.getElementById("final-actions");
  const finalContent = document.querySelector(".final-content");
  const yesMessage = document.getElementById("yes-message");
  const confetti = document.getElementById("confetti");
  const threadStage = document.getElementById("thread-stage");
  const threadPull = document.getElementById("thread-pull");
  const threadLine = document.getElementById("thread-line");
  const threadP = document.getElementById("thread-p");
  const threadE = document.getElementById("thread-e");
  const threadInstruction = document.getElementById("thread-instruction");
  const threadSuccess = document.getElementById("thread-success");
  let threadProgress = 0;
  let pullingThread = false;
  let threadStartY = 0;
  let threadPullDistance = 0;
  let threadFrame = 0;
  let threadLastFrame = 0;
  let keyboardPull = false;

  function throwConfetti(amount = 80) {
    confetti.replaceChildren();
    const colors = ["#fffaf6", "#efd88f", "#cbb8dd", "#292522", "#f3bfc0"];
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement("i");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.6 ? "50%" : "1px";
      piece.style.setProperty("--fall-x", `${(Math.random() - 0.5) * 180}px`);
      piece.style.setProperty("--fall-duration", `${2.4 + Math.random() * 2.4}s`);
      piece.style.setProperty("--fall-delay", `${Math.random() * 0.5}s`);
      confetti.appendChild(piece);
    }
  }

  function celebrate() {
    if (yesMessage.classList.contains("visible")) return;
    finalActions.style.display = "none";
    finalContent.classList.add("celebrating");
    yesMessage.classList.add("visible");
    navigator.vibrate?.([40, 60, 80]);
    throwConfetti();
  }

  function renderThread() {
    const stageRect = threadStage.getBoundingClientRect();
    const maxPull = Math.max(62, stageRect.height * 0.5);
    const pullInViewBox = (threadPullDistance / stageRect.height) * 170;
    const pX = 55 + 215 * threadProgress;
    const eX = 545 - 215 * threadProgress;
    const knotY = 45 + Math.min(90, pullInViewBox);

    threadLine.setAttribute("d", `M ${pX} 45 L 300 ${knotY} L ${eX} 45`);
    threadP.style.left = `${(pX / 600) * 100}%`;
    threadE.style.left = `${(eX / 600) * 100}%`;
    threadPull.style.top = `${(knotY / 170) * 100}%`;
    return maxPull;
  }

  function finishThread() {
    pullingThread = false;
    keyboardPull = false;
    threadProgress = 1;
    renderThread();
    threadStage.classList.add("complete");
    threadSuccess.classList.add("visible");
    threadInstruction.textContent = "Together at last ♥";
    navigator.vibrate?.([50, 45, 50, 45, 100]);
    throwConfetti(110);
  }

  function animateThread(now) {
    if (!pullingThread) return;
    const maxPull = renderThread();
    const tension = keyboardPull ? 1 : Math.max(0, Math.min(1, (threadPullDistance - 24) / (maxPull - 24)));
    const elapsed = Math.min(40, now - threadLastFrame);
    threadLastFrame = now;

    if (tension > 0) {
      threadProgress = Math.min(1, threadProgress + (elapsed / 2400) * (0.45 + tension * 0.55));
      renderThread();
      threadInstruction.textContent = threadProgress < 0.55 ? "Keep pulling… they’re getting closer" : "Almost together… keep holding";
    }

    if (threadProgress >= 1) {
      finishThread();
      return;
    }
    threadFrame = requestAnimationFrame(animateThread);
  }

  function beginThreadPull(event, fromKeyboard = false) {
    if (threadStage.classList.contains("complete") || pullingThread) return;
    event.preventDefault();
    pullingThread = true;
    keyboardPull = fromKeyboard;
    threadStartY = event.clientY || 0;
    threadPullDistance = fromKeyboard ? renderThread() : 0;
    threadLastFrame = performance.now();
    threadPull.classList.add("pulling");
    if (!fromKeyboard) threadPull.setPointerCapture?.(event.pointerId);
    threadFrame = requestAnimationFrame(animateThread);
  }

  function moveThreadPull(event) {
    if (!pullingThread || keyboardPull) return;
    const maxPull = Math.max(62, threadStage.getBoundingClientRect().height * 0.5);
    threadPullDistance = Math.max(0, Math.min(maxPull, event.clientY - threadStartY));
    renderThread();
  }

  function endThreadPull(event) {
    if (!pullingThread) return;
    pullingThread = false;
    keyboardPull = false;
    cancelAnimationFrame(threadFrame);
    if (event?.pointerId !== undefined && threadPull.hasPointerCapture?.(event.pointerId)) {
      threadPull.releasePointerCapture(event.pointerId);
    }
    threadPull.classList.remove("pulling");
    threadPullDistance = 0;
    renderThread();
    threadInstruction.textContent = threadProgress > 0
      ? "Pull again—don’t let them drift apart"
      : "Pull our thread down and hold it tight";
  }

  threadPull.addEventListener("pointerdown", (event) => beginThreadPull(event));
  threadPull.addEventListener("pointermove", moveThreadPull);
  threadPull.addEventListener("pointerup", endThreadPull);
  threadPull.addEventListener("pointercancel", endThreadPull);
  threadPull.addEventListener("keydown", (event) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) beginThreadPull(event, true);
  });
  threadPull.addEventListener("keyup", (event) => {
    if (event.key === " " || event.key === "Enter") endThreadPull(event);
  });
  window.addEventListener("resize", () => {
    if (!pullingThread && !threadStage.classList.contains("complete")) renderThread();
  });

  document.getElementById("yes-button").addEventListener("click", celebrate);
  document.getElementById("also-yes-button").addEventListener("click", celebrate);

  function escapeHTML(value) {
    const element = document.createElement("span");
    element.textContent = String(value);
    return element.innerHTML;
  }

  fillPersonalText();
})();
