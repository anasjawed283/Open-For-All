const colors = ["#66BFBF", "#EAF6F6", "#FF0063"];

let animateCircleFragment = document.createDocumentFragment();

function animateCircle(event) {
  let circleDivElem = document.createElement("div");
  circleDivElem.classList = "circle";

  animateCircleFragment.appendChild(circleDivElem);
  document.body.appendChild(animateCircleFragment);

  circleDivElem.style.left = event.clientX + "px";
  circleDivElem.style.top = event.clientY + "px";

  let color = colors[Math.floor(Math.random() * colors.length)];
  circleDivElem.style.borderColor = color;

  circleDivElem.style.transition = "all 0.5s linear 0s";

  circleDivElem.style.left = circleDivElem.offsetLeft - 20 + "px";
  circleDivElem.style.top = circleDivElem.offsetTop - 20 + "px";

  circleDivElem.style.width = "40px";
  circleDivElem.style.height = "40px";
  circleDivElem.style.borderWidth = "5px";
  circleDivElem.style.opacity = 0;
}
document.addEventListener("mousemove", animateCircle);
