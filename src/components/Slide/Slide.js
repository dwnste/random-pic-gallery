import React from 'react';
import './Slide.css';
import PropTypes from 'prop-types';
import { filterAttachments } from '../../utils';

const Slide = (props) => {
    const {
        slide,
        onClick,
    } = props;

    return <div
        className="Slide"
        onClick={onClick}
        style={{
            backgroundImage: `url(${filterAttachments(slide.attachments)[0].photo.sizes[6].url})`,
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
