const STORAGE_KEY = "trackerData";

const IS_MOBILE = window.matchMedia("(max-width: 600px)").matches;

const RINGS = {
  work: { el: document.getElementById("ring-work"), r: 88 },
  exercise: { el: document.getElementById("ring-exercise"), r: 66 },
  calorie: { el: document.getElementById("ring-calorie"), r: 44 }
};

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const data = loadData();
const key = todayKey();
if (!data[key]) {
  data[key] = { work: 0, exercise: 0, calorie: 0 };
}
const today = data[key];

function applyRingProgress(el, r, value) {
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - value);
  el.style.strokeDasharray = `${circumference}`;
  el.style.strokeDashoffset = `${offset}`;
}

function setRingProgress(ringKey, value) {
  const { el, r } = RINGS[ringKey];
  applyRingProgress(el, r, value);
}

function setButtonActive(btn, active) {
  btn.classList.toggle("active", active);
}

function setRingGlow(ringEl, active) {
  ringEl.classList.toggle("ring-glow", active);
}

function updateButton(ringKey) {
  setButtonActive(document.getElementById(`btn-${ringKey}`), today[ringKey] === 1);
}

function updateGlow(ringKey) {
  setRingGlow(RINGS[ringKey].el, today[ringKey] === 1);
}

function updateAll() {
  Object.keys(RINGS).forEach((ringKey) => {
    setRingProgress(ringKey, today[ringKey]);
    updateButton(ringKey);
    updateGlow(ringKey);
  });
}

const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}(${WEEKDAYS_EN[date.getDay()]})`;
}

const CONFETTI_COLORS = {
  work: ["#00e0ff", "#5ce8ff", "#a6f2ff"],
  exercise: ["#ff2d55", "#ff6b8b", "#ffb3c2"],
  calorie: ["#c6ff00", "#dcff66", "#eeffb0"]
};

function spawnConfetti(originEl, ringKey) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = CONFETTI_COLORS[ringKey];

  for (let i = 0; i < 14; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${cx}px`;
    piece.style.top = `${cy}px`;
    piece.style.background = colors[i % colors.length];

    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 60;
    piece.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
    piece.style.setProperty("--rot", `${(Math.random() - 0.5) * 360}deg`);

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 800);
  }
}

const PARTY_COLORS = ["#00e0ff", "#ff2d55", "#c6ff00", "#ffb800", "#9c27ff", "#00ffaa", "#ff6b00", "#ff5ac8"];

function spawnMegaConfetti(count) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece fall";
    piece.style.left = `${Math.random() * vw}px`;
    piece.style.background = PARTY_COLORS[i % PARTY_COLORS.length];

    const tx = (Math.random() - 0.5) * 300;
    const ty = vh + 60;
    piece.style.setProperty("--tx", `${tx}px`);
    piece.style.setProperty("--ty", `${ty}px`);
    piece.style.setProperty("--rot", `${(Math.random() - 0.5) * 1080}deg`);
    piece.style.animationDelay = `${Math.random() * 0.4}s`;

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}

function getRingCenter() {
  const wraps = document.querySelectorAll(".rings-wrap");
  for (const wrap of wraps) {
    if (wrap.offsetParent === null) continue;
    const rect = wrap.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

function spawnLasers(count) {
  const center = getRingCenter();
  for (let i = 0; i < count; i++) {
    const beam = document.createElement("div");
    beam.className = "laser-beam";
    beam.style.left = `${center.x}px`;
    beam.style.top = `${center.y}px`;
    beam.style.background = `linear-gradient(90deg, transparent, ${CELEBRATION_COLOR}, transparent)`;
    beam.style.setProperty("--angle", `${Math.random() * 360}deg`);

    document.body.appendChild(beam);
    setTimeout(() => beam.remove(), 350);
  }
}

function spawnFlash() {
  const flash = document.createElement("div");
  flash.className = "mega-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 700);
}

function spawnParticles(originEl, ringKey) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = CONFETTI_COLORS[ringKey];

  for (let i = 0; i < 16; i++) {
    const piece = document.createElement("div");
    piece.className = "sparkle-piece";
    piece.style.left = `${cx}px`;
    piece.style.top = `${cy}px`;
    const color = colors[i % colors.length];
    piece.style.background = color;
    piece.style.color = color;

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 90;
    piece.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--ty", `${Math.sin(angle) * distance - 20}px`);
    piece.style.animationDelay = `${Math.random() * 0.15}s`;

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1200);
  }
}

function spawnSmallCelebration(originEl, ringKey) {
  spawnParticles(originEl, ringKey);
}

function spawnSupernova(ringsConfig) {
  const duration = 400;
  Object.values(ringsConfig).forEach(({ el }) => {
    el.classList.remove("supernova-light");
    void el.offsetWidth;
    el.classList.add("supernova-light");
    setTimeout(() => el.classList.remove("supernova-light"), duration);
  });
}

function spawnMegaCelebration(ringsConfig) {
  spawnFlash();

  const supernovaBursts = 3;
  for (let b = 0; b < supernovaBursts; b++) {
    setTimeout(() => spawnSupernova(ringsConfig), b * 450);
  }

  const laserWaves = 10;
  for (let w = 0; w < laserWaves; w++) {
    setTimeout(() => spawnLasers(6), w * 180);
  }

  const waves = IS_MOBILE ? 6 : 8;
  const confettiCount = IS_MOBILE ? 40 : 75;
  for (let w = 0; w < waves; w++) {
    setTimeout(() => spawnMegaConfetti(confettiCount), w * 350);
  }
}

function playPopAnimations(ringEl, btn) {
  ringEl.classList.remove("ring-pop");
  btn.classList.remove("btn-pop");
  void ringEl.offsetWidth;
  void btn.offsetWidth;
  ringEl.classList.add("ring-pop");
  btn.classList.add("btn-pop");
}

const CELEBRATION_COLOR = "#ffb800";

function isAllComplete(stateObj) {
  return stateObj.work === 1 && stateObj.exercise === 1 && stateObj.calorie === 1;
}

function showCompletionCheck(checkEl) {
  checkEl.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="${CELEBRATION_COLOR}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" stroke-opacity="0.35"/>
    <path d="M7 12.5l3 3 7-7"/>
  </svg>`;
  checkEl.classList.remove("show");
  void checkEl.offsetWidth;
  checkEl.classList.add("show");
}

function hideCompletionCheck(checkEl) {
  checkEl.classList.remove("show");
  checkEl.innerHTML = "";
}

document.getElementById("today-date").textContent = formatDate(new Date());

["work", "exercise", "calorie"].forEach((ringKey) => {
  const btn = document.getElementById(`btn-${ringKey}`);
  btn.addEventListener("click", () => {
    today[ringKey] = today[ringKey] === 1 ? 0 : 1;
    saveData(data);
    setRingProgress(ringKey, today[ringKey]);
    updateButton(ringKey);
    updateGlow(ringKey);

    if (today[ringKey] === 1) {
      playPopAnimations(RINGS[ringKey].el, btn);
      spawnConfetti(btn, ringKey);
      spawnSmallCelebration(btn, ringKey);
    }

    if (isAllComplete(today)) {
      showCompletionCheck(document.getElementById("center-check"));
      if (today[ringKey] === 1) {
        spawnMegaCelebration(RINGS);
      }
    } else {
      hideCompletionCheck(document.getElementById("center-check"));
    }
  });
});

updateAll();

/* ---------- Calendar ---------- */

const DETAIL_RINGS = {
  work: { el: document.getElementById("detail-ring-work"), r: 88 },
  exercise: { el: document.getElementById("detail-ring-exercise"), r: 66 },
  calorie: { el: document.getElementById("detail-ring-calorie"), r: 44 }
};

const now = new Date();
let calYear = now.getFullYear();
let calMonth = now.getMonth();
let selectedDateKey = null;

function dateKeyFor(year, month, day) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function miniRingCircle(value, radius, colorClass) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - (value || 0));
  return `<circle class="cal-mini-progress ${colorClass}" cx="20" cy="20" r="${radius}" stroke-width="4" stroke-linecap="round" fill="none" style="stroke-dasharray:${circumference};stroke-dashoffset:${offset}"/>`;
}

function miniRingsSVG(dayData) {
  const work = dayData ? dayData.work : 0;
  const exercise = dayData ? dayData.exercise : 0;
  const calorie = dayData ? dayData.calorie : 0;
  return `<svg class="cal-mini-rings" viewBox="0 0 40 40">
    <circle class="cal-mini-track" cx="20" cy="20" r="16" stroke-width="4"/>
    <circle class="cal-mini-track" cx="20" cy="20" r="11" stroke-width="4"/>
    <circle class="cal-mini-track" cx="20" cy="20" r="6" stroke-width="4"/>
    ${miniRingCircle(work, 16, "ring-blue")}
    ${miniRingCircle(exercise, 11, "ring-red")}
    ${miniRingCircle(calorie, 6, "ring-yellow")}
  </svg>`;
}

function renderCalendar() {
  document.getElementById("cal-title").textContent = `${calYear}年${calMonth + 1}月`;
  const grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const todayKeyStr = todayKey();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-day empty";
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dKey = dateKeyFor(calYear, calMonth, d);
    const dayData = data[dKey];

    const cell = document.createElement("div");
    cell.className = "cal-day";
    if (dKey === todayKeyStr) cell.classList.add("is-today");
    if (dKey === selectedDateKey) cell.classList.add("selected");
    cell.innerHTML = `${miniRingsSVG(dayData)}<span class="cal-day-num">${d}</span>`;
    cell.addEventListener("click", () => showDayDetail(dKey, calYear, calMonth, d));
    grid.appendChild(cell);
  }
}

function refreshDayDetail() {
  const dayData = data[selectedDateKey] || { work: 0, exercise: 0, calorie: 0 };

  Object.keys(DETAIL_RINGS).forEach((ringKey) => {
    const { el, r } = DETAIL_RINGS[ringKey];
    const active = dayData[ringKey] === 1;
    applyRingProgress(el, r, dayData[ringKey] || 0);
    setRingGlow(el, active);
    setButtonActive(document.getElementById(`detail-btn-${ringKey}`), active);
  });
}

function showDayDetail(dKey, year, month, day) {
  selectedDateKey = dKey;
  renderCalendar();

  const detail = document.getElementById("day-detail");
  detail.classList.remove("hidden");

  document.getElementById("detail-date").textContent = formatDate(new Date(year, month, day));

  refreshDayDetail();
}

["work", "exercise", "calorie"].forEach((ringKey) => {
  const btn = document.getElementById(`detail-btn-${ringKey}`);
  btn.addEventListener("click", () => {
    if (!selectedDateKey) return;
    if (!data[selectedDateKey]) {
      data[selectedDateKey] = { work: 0, exercise: 0, calorie: 0 };
    }
    const dayData = data[selectedDateKey];
    dayData[ringKey] = dayData[ringKey] === 1 ? 0 : 1;
    saveData(data);

    refreshDayDetail();
    renderCalendar();

    if (dayData[ringKey] === 1) {
      playPopAnimations(DETAIL_RINGS[ringKey].el, btn);
      spawnConfetti(btn, ringKey);
      spawnSmallCelebration(btn, ringKey);
    }

    if (isAllComplete(dayData)) {
      showCompletionCheck(document.getElementById("detail-center-check"));
    } else {
      hideCompletionCheck(document.getElementById("detail-center-check"));
    }

    if (selectedDateKey === todayKey()) {
      today[ringKey] = dayData[ringKey];
      setRingProgress(ringKey, today[ringKey]);
      updateButton(ringKey);
      updateGlow(ringKey);

      if (isAllComplete(today)) {
        showCompletionCheck(document.getElementById("center-check"));
      } else {
        hideCompletionCheck(document.getElementById("center-check"));
      }
    }
  });
});

document.getElementById("cal-prev").addEventListener("click", () => {
  calMonth -= 1;
  if (calMonth < 0) {
    calMonth = 11;
    calYear -= 1;
  }
  renderCalendar();
});

document.getElementById("cal-next").addEventListener("click", () => {
  calMonth += 1;
  if (calMonth > 11) {
    calMonth = 0;
    calYear += 1;
  }
  renderCalendar();
});

function switchView(showEl, hideEl, direction, onShow) {
  if (!hideEl.classList.contains("hidden")) {
    const outClass = direction === "forward" ? "slide-out-left" : "slide-out-right";
    hideEl.classList.add(outClass);
    hideEl.addEventListener("animationend", function onOut() {
      hideEl.removeEventListener("animationend", onOut);
      hideEl.classList.remove(outClass);
      hideEl.classList.add("hidden");

      const inClass = direction === "forward" ? "slide-in-right" : "slide-in-left";
      showEl.classList.remove("hidden");
      if (onShow) onShow();
      showEl.classList.add(inClass);
      showEl.addEventListener("animationend", function onIn() {
        showEl.removeEventListener("animationend", onIn);
        showEl.classList.remove(inClass);
      }, { once: true });
    }, { once: true });
  } else {
    showEl.classList.remove("hidden");
    if (onShow) onShow();
  }
}

document.getElementById("tab-today").addEventListener("click", () => {
  document.getElementById("tab-today").classList.add("active");
  document.getElementById("tab-calendar").classList.remove("active");
  switchView(document.getElementById("view-today"), document.getElementById("view-calendar"), "backward");
});

document.getElementById("tab-calendar").addEventListener("click", () => {
  document.getElementById("tab-calendar").classList.add("active");
  document.getElementById("tab-today").classList.remove("active");
  switchView(document.getElementById("view-calendar"), document.getElementById("view-today"), "forward", renderCalendar);
});
