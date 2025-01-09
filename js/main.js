const tooltips = document.getElementsByClassName("tooltip-wrapper");

function initTooltip(el) {
  const content = document.createElement("span");
  content.innerText = el.getAttribute("data-title");
  content.className = "tooltip-content";
  content.style.backgroundColor = el.getAttribute("data-background") || "#737373";

  const description = document.createElement("span");
  description.className = "tooltip-inline-description";
  description.innerText = `(${el.getAttribute("data-title")})`;

  el.appendChild(content);
  el.appendChild(description);

  el.addEventListener("click", () => {
    if (window.innerWidth >= 768) {
      content.classList.add("triggered");
    }
  });

  el.addEventListener("focus", () => {
    if (window.innerWidth >= 768) {
      content.classList.add("triggered");
    }
  });

  el.addEventListener("focusout", () => {
    if (window.innerWidth >= 768) {
      content.classList.remove("triggered");
    }
  });

  document.addEventListener("click", (e) => {
    if (!el.contains(e.target) && window.innerWidth >= 768) content.classList.remove("triggered");
  });
}

function removeTooltips() {
  for (const tooltip of tooltips) {
    const content = tooltip.getElementsByClassName("tooltip-content")[0];
    content.classList.remove("triggered");
  }
}

function checkTooltipTabindex(screenWidth) {
  return screenWidth < 768 ? -1 : 0;
}

function correctPositionTooltip(el) {
    const content = el.getElementsByClassName("tooltip-content")[0];
    const { top, left, right } = el.getBoundingClientRect();  

    const isOnRight = right + 100 > window.innerWidth;
    const isOnLeft = left < 100;
    const isOnBottom = top - 50 < 0;

    content.classList.toggle("on-right", isOnRight);
    content.classList.toggle("on-left", isOnLeft);
    content.classList.toggle("on-bottom", isOnBottom);
}

document.addEventListener("DOMContentLoaded", () => {
    for (const tooltip of tooltips) {
      initTooltip(tooltip);
        tooltip.tabIndex = checkTooltipTabindex(window.innerWidth);
        correctPositionTooltip(tooltip);
    }
});

document.addEventListener("scroll", () => {
    for (const tooltip of tooltips) {
        tooltip.tabIndex = checkTooltipTabindex(window.innerWidth);
        correctPositionTooltip(tooltip);
    }
})

window.addEventListener("resize", (e) => {
  for (const tooltip of tooltips) {
    tooltip.tabIndex = checkTooltipTabindex(e.target.innerWidth);
    correctPositionTooltip(tooltip);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") removeTooltips();
});