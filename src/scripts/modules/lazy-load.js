require('intersection-observer');

export default class Lazyload {
    constructor() {
        console.log('Intersection Observer point 1')
        this.init();
    }

    observer() {
        console.log('Intersection Observer point 2')
        let options = {
            rootMargin: "-100px 0px"
        };
        let observer = new IntersectionObserver(entries => {
            console.log('Intersection Observer point 3')
            entries.forEach(entry => {
                console.log('Intersection Observer point 4')
                if (entry.isIntersecting) {
                    console.log('Intersection Observer point 5')
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
        console.log('Intersection Observer point 6')
        const observer = this.observer();
        let elements = document.querySelectorAll('.lazyload');

        // elements.forEach(el => observer.observe(el))
        for (let index of elements) observer.observe(index);
        console.log('Intersection Observer point 7')
    }
}