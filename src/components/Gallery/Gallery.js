import React, { Component } from 'react';
import './Gallery.css';
import PropTypes from 'prop-types';
import Controls from '../Controls/Controls';
import Modal from '../Modal/Modal';
import Slide from '../Slide/Slide';

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

        if (!currentSlides.length) {
            return null;
        }

        return <div className="Gallery">
            { isModalShown && <Modal
                item={currentSlides[current]}
                closeModal={closeModal}
                openModal={openModal}
                isModalShown={isModalShown}
            /> }
            <div className="Gallery__slides">
                {current > 0 && <div className="Gallery__slide Gallery__slide-control">
                    <Slide
                        slide={currentSlides[current - 1]}
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
                        slide={currentSlides[current + 1]}
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
