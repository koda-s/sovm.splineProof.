const text = new SplitType(".am_text", { types: "lines" });
const header = document.querySelector("header");
const loader = document.querySelector(".hero");
const icons = document.querySelectorAll(".icon")

const rand = (n1, n2) => gsap.utils.random(n1, n2);

let directions = ["left center", "right center", "center center"]
const choose = gsap.utils.random(directions)

const masterTl = gsap.timeline();

masterTl.to(loader, {
    transformOrigin: choose,
    scaleX: 0,
    delay: .3,
    duration: .5,
    ease: "power1.out",
    onComplete: () => {
        gsap.set(loader, { display: "none" });
    }
}, 0); // empieza inmediatamente


masterTl.addLabel("header", 0.5) // Creamos una etiqueta header a los 0.25s (mitad de la duracion de animacion del loader)
// 3. Animar el header
masterTl.from(header, {
    scaleX: 0,
    duration: .7,
    delay: 0.4,
    ease: "power2.out",
    onComplete: () => {
        animateIcons();
    }
}, "header");


// 4. Animar las líneas de texto una a una
text.lines.forEach((line, index) => {
    masterTl.from(line, {
        opacity: 0,
        y: 100,
        duration: 0.4,
        ease: "back.out",
        delay: index * 0.1,
    }, `header+=.25`); // delay incremental para cascada
});

const splineViewer = document.querySelector('spline-viewer');

masterTl.add(() => {
    gsap.to("#canvas3d", {
        opacity: 1,
        display: "initial",
        pointerEvents: "all",
        duration: 1,
    });
})
// El modelo ya esta y se le agrega la opacidad..(y se reinicia la animacion pero ocasiona atascos)

function animateIcons() {
    icons.forEach((icon, i) => {
        const iconTl = gsap.timeline();
        iconTl.to(icon, {
            opacity: 1
        }, "move")
        iconTl.from(icon, {
            y: rand(-100, 100),
            ease: "back.out",
            delay: i + 1,
        }, "move+=")
    })
}