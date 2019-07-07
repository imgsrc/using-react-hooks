import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

Spinner.displayName = 'MDCSpinner';

Spinner.propTypes = {
    colorful: PropTypes.bool
};

import './index.scss';

export default function Spinner({
    colorful = false,

    className,
    ...props
}) {
    const classNames = classnames('mdc-spinner', {
        'mdc-spinner--colorful': colorful
    }, className);

    return (
        <svg className={classNames} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle className="mdc-spinner__circle" cx="33" cy="33" r="30" />
        </svg>
    );
}