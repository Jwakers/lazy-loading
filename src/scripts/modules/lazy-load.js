export default class Lazyload {
    constructor() {
        this.init()
    }

    observer() {
        let options = {
            rootMargin: "-100px 0px"
        };
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                console.log(entry);
                if (entry.isIntersecting) {
                    entry.target.classList.add('lazyload--loaded');
                }
            })
        }, options);
        return observer;
    }

    init() {
        const observer = this.observer();
        let elements = document.querySelectorAll('.lazyload');

        elements.forEach(el => observer.observe(el))
    }
}