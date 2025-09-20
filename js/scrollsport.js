document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Щоб анімація спрацювала лише раз
            }
        });
    }, { threshold: 0.2 }); // 20% елемента має бути видно

    elements.forEach(el => observer.observe(el));
});
