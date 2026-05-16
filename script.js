const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

reveals.forEach((element) => {

```
const windowHeight = window.innerHeight;
const revealTop = element.getBoundingClientRect().top;

if (revealTop < windowHeight - 100) {

  element.classList.add("active");

}
```

});

});

const langToggle = document.getElementById("langToggle");

let english = false;

langToggle.addEventListener("click", () => {

english = !english;

const elements = document.querySelectorAll("[data-es]");

elements.forEach((el) => {

```
el.textContent = english
  ? el.dataset.en
  : el.dataset.es;
```

});

});
