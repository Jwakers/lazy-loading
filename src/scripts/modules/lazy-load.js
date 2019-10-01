import 'picturefill';
require('intersection-observer');

export default class Lazyload {
    constructor(selector = ".lazyload", rootMargin = "40px 0px", rootElement) {
        this.selector = selector;
        this.rootMargin = rootMargin;
        if (rootElement) this.rootElement = rootElement;
        this.init();
    }

    observer() {
        let options = {
            rootMargin: this.rootMargin
        };
        const addSource = (target) => {
            let [src, srcset] = [target.getAttribute('data-src'), target.getAttribute('data-srcset')];
            if (src) target.setAttribute('src', src);
            if (srcset) target.setAttribute('srcset', srcset);
        }
        if (this.rootElement) options.root = document.querySelector(this.rootElement);
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {   
                    if (entry.target.nodeName === 'PICTURE') {
                        const children = entry.target.querySelectorAll('source, img');
                        for (let index of children) {
                            addSource(index)
                        }
                    } else {
                        addSource(entry.target);
                    }
                    entry.target.classList.add('lazyload--loaded');

                    picturefill({
                        reevaluate: true
                      });
                }
            })
        }, options);
        return observer;
    }

    init() {
        const observer = this.observer();
        let elements = document.querySelectorAll(this.selector);

        for (let index of elements) observer.observe(index);
    }
}