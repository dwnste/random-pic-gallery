import React from 'react';
import PropTypes from 'prop-types';
import './Controls.css';
import { getFirstPhoto, findIndex } from '../../utils';

const Controls = (props) => {
    const {
        currentSlides,
        onNextSlide,
        onPrevSlide,
        onSlideSelect,
        current,
        size,
    } = props;

    let slides;

    if (current < size - 1) {
        slides = currentSlides.slice(0, size);
    } else {
        slides = currentSlides.slice(current - size + 2, current + 2);
    }

    return <div className="Controls">
        <div
            className="Controls__left"
            onClick={onPrevSlide}
        />
        {slides.map(slide => <div
            key={slide.id}
            onClick={() => onSlideSelect(findIndex(currentSlides, slide.id))}
            className={`Controls__image ${current === findIndex(currentSlides, slide.id) && 'Controls__image-active'}`}
            style={{
                backgroundImage: `url(${getFirstPhoto(slide.attachments)})`,
            }}
        />)}
        <div
            className="Controls__right"
            onClick={() => onNextSlide(size)}
        />
    </div>;
};

Controls.propTypes = {
    current: PropTypes.number.isRequired,
    currentSlides: PropTypes.arrayOf(PropTypes.object).isRequired,
    onNextSlide: PropTypes.func.isRequired,
    onPrevSlide: PropTypes.func.isRequired,
    onSlideSelect: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
};

export default Controls;
