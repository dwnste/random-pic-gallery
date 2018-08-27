import React, { Component } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import getPosts from './api/api';
import { filterSlides, preloadSlides } from './utils';

const gallerySize = 5;

class App extends Component {
    state = {
        slides: [],
        current: 0,
        offset: 0,
        isModalShown: false,
        isLoading: false,
    };

    openModal = () => {
        this.setState({
            isModalShown: true,
        });
    }

    closeModal = () => {
        this.setState({
            isModalShown: false,
        });
    }

    getSlides = (size, offset = 0, prevSlides = []) => getPosts(size, offset)
        .then((res) => {
            this.setState({ isLoading: true });

            const newSlides = [
                ...prevSlides,
                ...filterSlides(res),
            ];

            if (res.length === 0 || newSlides.length >= size) {
                return preloadSlides(newSlides).then(() => {
                    this.setState({
                        isLoading: false,
                        offset: offset + res.length,
                    });

                    return newSlides;
                });
            }

            return this.getSlides(size, offset + res.length, newSlides);
        });

    pushSlides = (newSlides) => {
        const { slides } = this.state;

        this.setState({
            slides: [
                ...slides,
                ...newSlides,
            ],
        });
    }

    onNextSlide = (size) => {
        const {
            current,
            slides,
            offset,
            isLoading,
        } = this.state;

        const nextSlide = current + 1;
        const noMoreSlides = slides.length === nextSlide;
        const isPenultimateSlide = slides.length === current + 2;

        if (isLoading || noMoreSlides) {
            return;
        }

        if (isPenultimateSlide) {
            this.getSlides(size, offset)
                .then(this.pushSlides)
                .then(() => {
                    this.setState({
                        current: nextSlide,
                    });
                });
        } else {
            this.setState({
                current: nextSlide,
            });
        }
    };

    onPrevSlide = () => {
        const {
            current,
            isLoading,
        } = this.state;

        const prevSlide = current - 1;

        if (isLoading) {
            return;
        }

        if (prevSlide >= 0) {
            this.setState({
                current: prevSlide,
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
            slides,
            current,
            isModalShown,
        } = this.state;

        return <div className="App">
            <div className="App__gallery">
                <Gallery
                    size={gallerySize}
                    current={current}
                    currentSlides={slides}
                    isModalShown={isModalShown}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    getSlides={this.getSlides}
                    pushSlides={this.pushSlides}
                    onSlideSelect={this.onSlideSelect}
                    onNextSlide={this.onNextSlide}
                    onPrevSlide={this.onPrevSlide}
                />
            </div>
        </div>;
    }
}

export default App;
