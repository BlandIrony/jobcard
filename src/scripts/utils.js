import imagesLoaded from "imagesloaded";

/**
 * Preload images
 * @param {String} selector - Selector/scope from where images need to be preloaded. Default is 'img'
 */
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

/**
 * Checks if an element is in the viewport
 * @param {Element} elem - the element to be checked
 */
const isInViewport = elem => {
    var bounding = elem.getBoundingClientRect();
    return (
        (bounding.bottom >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) || bounding.top >= 0 && bounding.top <= (window.innerHeight || document.documentElement.clientHeight)) &&
        (bounding.right >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) || bounding.left >= 0 && bounding.left <= (window.innerWidth || document.documentElement.clientWidth))
    );
};

export { preloadImages, isInViewport };