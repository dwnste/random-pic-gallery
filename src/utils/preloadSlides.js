import getFirstPhoto from './getFirstPhoto';

const preloadSlides = (slides) => {
    const promisesArray = slides.map((item) => {
        const image = new Image();
        image.src = getFirstPhoto(item.attachments);
        const promise = new Promise((resolve) => {
            image.onload = () => resolve(item);
        });
        return promise;
    });
    return Promise.all(promisesArray);
};

export default preloadSlides;
