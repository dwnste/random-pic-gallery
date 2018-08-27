import React, { Component } from 'react';
import './Gallery.css';
import PropTypes from 'prop-types';
import Controls from '../Controls/Controls';
import Modal from '../Modal/Modal';
import Slide from '../Slide/Slide';
import { rightArrowCode, leftArrowCode } from '../../consts';

class Gallery extends Component {
    static propTypes = {
        size: PropTypes.number.isRequired,
        currentSlides: PropTypes.arrayOf(PropTypes.object).isRequired,
        current: PropTypes.number.isRequired,
        isModalShown: PropTypes.bool.isRequired,
        openModal: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
        getSlides: PropTypes.func.isRequired,
        pushSlides: PropTypes.func.isRequired,
        onNextSlide: PropTypes.func.isRequired,
        onPrevSlide: PropTypes.func.isRequired,
        onSlideSelect: PropTypes.func.isRequired,
    };

    componentWillMount() {
        document.addEventListener('keydown', this.handleArrowPress);
    }

    componentDidMount() {
        const {
            getSlides,
            pushSlides,
            size,
            currentSlides,
        } = this.props;

        if (!currentSlides.length) {
            getSlides(size).then(pushSlides);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleArrowPress);
    }

    handleArrowPress = (event) => {
        const {
            size,
            onPrevSlide,
            onNextSlide,
        } = this.props;

        switch (event.keyCode) {
        case leftArrowCode:
            event.preventDefault();
            onPrevSlide();
            break;
        case rightArrowCode:
            event.preventDefault();
            onNextSlide(size);
            break;
        }
    }

    render() {
        const {
            current,
            isModalShown,
            openModal,
            closeModal,
            currentSlides,
            onNextSlide,
            onPrevSlide,
            onSlideSelect,
            size,
        } = this.props;

        const hasSlides = currentSlides.length > current + 1;
        const prevSlide = current - 1;
        const nextSlide = current + 1;

        if (!currentSlides.length) {
            return null;
        }

        return <div className="Gallery">
            { isModalShown && <Modal
                item={currentSlides[current]}
                closeModal={closeModal}
            /> }
            <div className="Gallery__slides">
                {current > 0 && <div className="Gallery__slide Gallery__slide-control">
                    <Slide
                        slide={currentSlides[prevSlide]}
                        onClick={onPrevSlide}
                    />
                </div>}
                <div className="Gallery__slide Gallery__slide-current">
                    <Slide
                        slide={currentSlides[current]}
                        onClick={openModal}
                    />
                </div>
                {hasSlides && <div className="Gallery__slide Gallery__slide-control">
                    <Slide
                        slide={currentSlides[nextSlide]}
                        onClick={() => onNextSlide(size)}
                    />
                </div>}
            </div>
            <div className="Gallery__controls">
                <Controls
                    current={current}
                    currentSlides={currentSlides}
                    onSlideSelect={onSlideSelect}
                    onNextSlide={onNextSlide}
                    onPrevSlide={onPrevSlide}
                    size={size}
                />
            </div>
        </div>;
    }
}

export default Gallery;
