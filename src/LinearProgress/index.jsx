import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

LinearProgress.displayName = 'MDCLinearProgress';

LinearProgress.propTypes = {
    value: PropTypes.number,
    buffer: PropTypes.number,
    indeterminate: PropTypes.bool,
    reversed: PropTypes.bool,
    closed: PropTypes.bool
};

export default function LinearProgress({
    value = 0,
    buffer = 0,
    indeterminate = false,
    reversed = false,
    closed = false,

    className,
    ...props
}) {
    const classNames = classnames('mdc-linear-progress', {
        'mdc-linear-progress--indeterminate': indeterminate,
        'mdc-linear-progress--reversed': reversed,
        'mdc-linear-progress--closed': closed
    }, className);

    const bufferStyle = {
        transform: buffer ? `scaleX(${indeterminate ? 1 : buffer * 0.01})` : undefined
    };
    
    const primaryBarStyle = {
        transform: `scaleX(${indeterminate ? 1 : value * 0.01})`
    };

    return (
        <div
            className={classNames}
            role="progressbar"
            {...props}
        >
            <div className="mdc-linear-progress__buffering-dots"></div>

            <div className="mdc-linear-progress__buffer" style={bufferStyle}></div>

            <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar" style={primaryBarStyle}>
                <span className="mdc-linear-progress__bar-inner"></span>
            </div>

            <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                <span className="mdc-linear-progress__bar-inner"></span>
            </div>
        </div>
    );
}