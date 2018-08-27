import React, { Component } from 'react';
import './Modal.css';
import { getFirstPhoto } from '../../utils';

class Modal extends Component {
    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick = (event) => {
        const {
            isModalShown,
            toggleModal,
        } = this.props;

        if (isModalShown) {
            event.stopPropagation();
            toggleModal();
        }
    }

    render() {
        const {
            item,
        } = this.props;

        const imageUrl = getFirstPhoto(item.attachments);

        return <div className="Modal">
            <div
                className="Modal__background"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <img
                className="Modal__image"
                src={imageUrl}
                alt={item.id}
            />
        </div>;
    }
}

export default Modal;
