import Lenis from "@studio-freight/lenis";

// Utils
import split from "./utils/split";
import getRandomNumber from "./utils/randomNumber";

// Data
import data from "./utils/data.json";

const lenis = new Lenis();

lenis.on("scroll", (_e: WheelEvent) => {});

function raf(time: any) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

let screenWidth = window.screen.width;

window.addEventListener("resize", () => {
  screenWidth = window.screen.width;
});

// Link hover animation

const links = document.querySelectorAll("a.link");

if (!window.matchMedia("(pointer:coarse)").matches) {
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
    const top = { min: 10, max: 50, diff: 20 };
    const left = { min: 10, max: 100, diff: 15 };

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
      const elements = document.querySelectorAll(`[data-img="${attribute}"]`);

      elements.forEach((img, index: number) => {
        img.classList.remove("hide", "initial");
        img.classList.add("show");
        if (attribute?.charAt(attribute.length - 1) === "R") {
          // @ts-ignore
          img.style.top = `${topNumber[index]}rem`;
          // @ts-ignore
          img.style.left = `${leftNumber[index]}rem`;
          // @ts-ignore
          img.style.transitionDelay = `${index * 0.1}s`;
        }
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
}

// Menu modal

const menuModal = document.querySelector(".menu__modal");
const menuLinks = document.querySelectorAll(".menu__link");
const menuItem1 = document.querySelector(".menu__modal .item-1");
const menuItem1Ul = document.querySelector(".menu__modal .item-1 ul");
const menuTitle = document.querySelector(".menu__modal .title");
const menuItem2 = document.querySelector(".menu__modal .item-2");
const menuImg = document.querySelector(".menu__modal .item-2 img");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const attribute = link.getAttribute("data-id")?.slice(0, -1);
    let menuData: {
      name: string;
      price: string;
    }[];

    if (attribute === "gyros") {
      menuData = data.gyros;
      // @ts-ignore
      menuTitle.textContent = "Gyros";
      menuImg?.setAttribute("src", "/src/images/menu/menuGyros.webp");
    } else if (attribute === "pica") {
      menuData = data.pica;
      // @ts-ignore
      menuTitle.textContent = "Pića";
      menuImg?.setAttribute("src", "/src/images/menu/menuPica.webp");
    } else if (attribute === "ostalo") {
      menuData = data.ostalo;
      // @ts-ignore
      menuTitle.textContent = "Ostalo";
      menuImg?.setAttribute("src", "/src/images/menu/ostalo (3).webp");
    }

    // @ts-ignore
    menuData.forEach((item) => {
      const elementLi = document.createElement("li");
      const elementName = document.createElement("div");
      const elementSpace = document.createElement("div");
      const elementPrice = document.createElement("div");

      elementName.textContent = item.name;
      elementPrice.textContent = item.price;
      elementSpace.textContent = "";

      elementSpace.classList.add("menu__modal__space-line");
      elementName.style.whiteSpace = "nowrap";

      elementLi.appendChild(elementName);
      elementLi.appendChild(elementSpace);
      elementLi.appendChild(elementPrice);

      menuItem1Ul?.appendChild(elementLi);
    });

    menuModal?.classList.add("active");
    menuItem1?.classList.add("active");
    menuItem2?.classList.add("active");
  });
});

const closeMenu = document.querySelector(".menu__modal .item-1__close");

closeMenu?.addEventListener("click", () => {
  menuModal?.classList.remove("active");
  menuItem1?.classList.replace("active", "closing");
  menuItem2?.classList.replace("active", "closing");
  menuItem1Ul?.replaceChildren();

  setTimeout(() => {
    menuItem1?.classList.replace("closing", "closed");
    menuItem2?.classList.replace("closing", "closed");
    menuImg?.setAttribute("src", "");

    setTimeout(() => {
      menuItem1?.classList.remove("closed");
      menuItem2?.classList.remove("closed");
    }, 100);
  }, 650);
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
const navMenu = document.querySelector(".nav__menu");
const item1 = document.querySelector(".nav__menu .item-1");
const item2 = document.querySelector(".nav__menu .item-2");
const navLinks = document.querySelectorAll(".nav__menu .item-1>div .link");

const closeNavigation = () => {
  ham?.classList.toggle("active");
  navMenu?.classList.toggle("active");
  if (ham?.classList.contains("active")) {
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
};

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // @ts-ignore
    if (!e.target.dataset.id) return;

    closeNavigation();
    // @ts-ignore
    lenis.scrollTo(document.getElementById(link.dataset.id));
  });
});
ham?.addEventListener("click", closeNavigation);

// Slider

const targets = document.querySelectorAll(".slider .item-1 img");
const sliderTitle = document.querySelector(".slider .item-2 h3");
const sliderDescription = document.querySelector(".slider .item-2 p");

let options;

if (screenWidth > 768) {
  options = {
    rootMargin: "0px",
    threshold: 0.5,
  };

  let callback = (entries: any[], _observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        // @ts-ignore
        sliderDescription.style.opacity = "0";
        // @ts-ignore
        sliderTitle.style.opacity = "0";
        setTimeout(() => {
          sliderTitle?.replaceChildren(entry.target.dataset.title);
          sliderDescription?.replaceChildren(entry.target.dataset.description);
          // @ts-ignore
          sliderDescription.style.opacity = "1";
          // @ts-ignore
          sliderTitle.style.opacity = "1";
        }, 300);
      } else {
        // @ts-ignore
        sliderDescription.style.opacity = "0";
        // @ts-ignore
        sliderTitle.style.opacity = "0";
      }
    });
  };

  let observer = new IntersectionObserver(callback, options);

  targets.forEach((target) => {
    observer.observe(target);
  });
} else {
  sliderTitle?.replaceChildren("Hiljade zadovoljnih mušterija");
  sliderDescription?.replaceChildren(
    "Hiljade zadovoljnih gostiju su uživali u našim ukusnim girosima, uživajući u savršenoj kombinaciji nežnog, začinjenog mesa, svežeg povrća i kremastog tzatziki sosa. Naša posvećenost kulinarističkoj izvrsnosti i zadovoljstvu gostiju sjaji u svakom zalogaju. Od naše prijateljske usluge do naših ukusnih girosa, ponosimo se što premašujemo očekivanja. Pridružite se redovima naših zadovoljnih posetilaca i uživajte u giros iskustvu kao nikada ranije. Vaše poverenje pokreće našu strast i jedva čekamo da vas poslužimo sa istom posvećenošću koja je obradovala hiljade."
  );

  const track = document.querySelector(".slider .item-1");

  track?.addEventListener("touchstart", (e) => {
    // @ts-ignore
    track.dataset.mouseDownAt = e.touches[0].clientX;
  });

  track?.addEventListener("touchmove", (e) => {
    // @ts-ignore
    if (track.dataset.mouseDownAt === "0") return;
    const mouseDelta =
      // @ts-ignore
      parseFloat(track.dataset.mouseDownAt) - e.touches[0].clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        // @ts-ignore
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    // @ts-ignore
    track.dataset.percentage = nextPercentage;

    // @ts-ignore
    track.animate(
      {
        transform: `translateX(${nextPercentage}%)`,
      },
      { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByTagName("img")) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  });

  track?.addEventListener("touchend", (_e) => {
    // @ts-ignore
    track.dataset.mouseDownAt = "0";
    // @ts-ignore
    track.dataset.prevPercentage = track.dataset.percentage;
  });
}
