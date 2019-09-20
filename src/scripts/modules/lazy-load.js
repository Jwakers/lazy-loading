require('intersection-observer');
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
                    const [src, srcset] = [entry.target.getAttribute('data-src'), entry.target.getAttribute('data-srcset')]

                    if (src) entry.target.setAttribute('src', src);
                    if (srcset) entry.target.setAttribute('srcset', srcset);
                    entry.target.classList.add('lazyload--loaded');
                }
            })
        }, options);
        return observer;
    }

    init() {
        const observer = this.observer();
        let elements = document.querySelectorAll('.lazyload');

        // elements.forEach(el => observer.observe(el))
        for (let index of elements) observer.observe(index);
    }
}