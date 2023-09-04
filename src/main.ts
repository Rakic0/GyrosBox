import Lenis from "@studio-freight/lenis";

// Utils
import split from "./utils/split";
import getRandomNumber from "./utils/randomNumber";

const lenis = new Lenis();

lenis.on("scroll", (_e: WheelEvent) => {});

function raf(time: any) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Link hover animation

const links = document.querySelectorAll("a.link");

links.forEach((link) => {
  const { letters }: { letters: string[] } = split(link.textContent);
  link.textContent = "";

  for (let i = 0; i < 2; i++) {
    const container = document.createElement("span");
    container.classList.add("container");
    letters.forEach((letter: string, index: number) => {
      const span = document.createElement("span");
      span.innerHTML = letter;
      span.style.transitionDelay = `${index * 0.03}s`;
      container.appendChild(span);
    });
    link.appendChild(container);
  }
});

// Image animations

const getRandomPositions = () => {
  const top = { min: 10, max: 60, diff: 20 };
  const left = { min: 10, max: 140, diff: 10 };

  const topNumber = getRandomNumber(top);
  const leftNumber = getRandomNumber(left);

  return {
    topNumber,
    leftNumber,
  };
};

links.forEach((link) => {
  const attribute = link.getAttribute("data-id");

  link.addEventListener("mouseenter", () => {
    const { topNumber, leftNumber } = getRandomPositions();

    document
      .querySelectorAll(`[data-img="${attribute}"]`)
      .forEach((img, index: number) => {
        img.classList.remove("hide", "initial");
        img.classList.add("show");
        // @ts-ignore
        img.style.top = `${topNumber[index]}rem`;
        // @ts-ignore
        img.style.left = `${leftNumber[index]}rem`;
        // @ts-ignore
        img.style.transitionDelay = `${index * 0.1}s`;
      });
  });

  link.addEventListener("mouseleave", () => {
    document.querySelectorAll(`[data-img="${attribute}"]`).forEach((img) => {
      img.classList.replace("show", "hide");
      setTimeout(() => {
        img.classList.add("initial");
      }, 610);
    });
  });
});

// Navigation

const navigation = document.querySelector("nav.navigation");

window.addEventListener("wheel", () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    navigation?.classList.add("active");
  } else {
    navigation?.classList.remove("active");
  }
});

//  Menu

const ham = document.querySelector(".ham");
const item1 = document.querySelector(".item-1");
const item2 = document.querySelector(".item-2");

ham?.addEventListener("click", () => {
  ham.classList.toggle("active");
  if (ham.classList.contains("active")) {
    item1?.classList.add("active");
    item2?.classList.add("active");
  } else {
    item1?.classList.replace("active", "closing");
    item2?.classList.replace("active", "closing");

    setTimeout(() => {
      item1?.classList.replace("closing", "closed");
      item2?.classList.replace("closing", "closed");

      setTimeout(() => {
        item1?.classList.remove("closed");
        item2?.classList.remove("closed");
      }, 100);
    }, 650);
  }
});
