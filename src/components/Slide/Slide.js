import React from 'react';
import './Slide.css';
import PropTypes from 'prop-types';
import { getFirstPhoto } from '../../utils';

const Slide = (props) => {
    const {
        slide,
        onClick,
    } = props;

    return <div
        className="Slide"
        onClick={onClick}
        style={{
            backgroundImage: `url(${getFirstPhoto(slide.attachments)})`,
        }}
    />;
};

Slide.propTypes = {
    slide: PropTypes.shape({
        attachments: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Slide;
