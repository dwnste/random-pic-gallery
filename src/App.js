import React, { Component } from 'react';
import './App.css';
import Gallery from './components/Gallery/Gallery';
import { getImages } from './api/api';
import { filterSlides } from './utils';

const gallerySize = 5;

class App extends Component {
    state = {
        images: [],
        current: 0,
        offset: 0,
        isModalShown: false,
        isLoading: false,
    };

    toggleModal = () => {
        const { isModalShown } = this.state;

        this.setState({
            isModalShown: !isModalShown,
        });
    };

    getSlides = (size, offset = 0, prevSlides = []) => getImages(size, offset)
        .then((res) => {
            const { isLoading } = this.state;

            if (!isLoading) {
                this.setState({ isLoading: true });
            }

            const slides = [...prevSlides, ...filterSlides(res)];

            if (res.length === 0 || slides.length >= size) {
                return {
                    slides,
                    offset: offset + res.length,
                };
            }

            return this.getSlides(size, offset + res.length, slides);
        });

    pushSlides = ({ slides, offset }) => {
        const { images } = this.state;

        this.setState({
            images: [
                ...images,
                ...slides,
            ],
            offset,
            isLoading: false,
        });
    }

    onNextSlide = (size) => {
        const {
            current,
            images,
            offset,
            isLoading,
        } = this.state;

        const noMoreSlides = images.length === current + 1;

        if (isLoading || noMoreSlides) {
            return;
        }

        if (images.length === current + 2) {
            this.getSlides(size, offset)
                .then(this.pushSlides)
                .then(() => {
                    this.setState({
                        current: current + 1,
                    });
                });
        } else {
            this.setState({
                current: current + 1,
            });
        }
    };

    onPrevSlide = () => {
        const {
            current,
            isLoading,
        } = this.state;

        if (isLoading) {
            return;
        }

        if ((current - 1) >= 0) {
            this.setState({
                current: current - 1,
            });
        }
    };

    onSlideSelect = (newCurrent) => {
        const {
            current,
            isLoading,
        } = this.state;

        if (isLoading || current === newCurrent) {
            return;
        }

        this.setState({ current: newCurrent });
    }

    render() {
        const {
            images,
            current,
            isModalShown,
        } = this.state;

        return <div className="App">
            <div className="App__gallery">
                <Gallery
                    size={gallerySize}
                    current={current}
                    currentSlides={images}
                    isModalShown={isModalShown}
                    getSlides={this.getSlides}
                    pushSlides={this.pushSlides}
                    onSlideSelect={this.onSlideSelect}
                    onNextSlide={this.onNextSlide}
                    onPrevSlide={this.onPrevSlide}
                    toggleModal={this.toggleModal}
                />
            </div>
        </div>;
    }
}

export default App;
