import React, { Component } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import { escCode } from '../../consts';
import { getFirstPhoto } from '../../utils';

class Modal extends Component {
    static propTypes = {
        closeModal: PropTypes.func.isRequired,
        item: PropTypes.shape({
            attachments: PropTypes.arrayOf(PropTypes.object),
        }).isRequired,
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
        document.addEventListener('keydown', this.handleEscPress);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('keydown', this.handleEscPress);
    }

    handleClick = (event) => {
        const { closeModal } = this.props;

        event.stopPropagation();
        closeModal();
    }

    handleEscPress = (event) => {
        const { closeModal } = this.props;

        if (event.keyCode === escCode) {
            closeModal();
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
