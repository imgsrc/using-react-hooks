import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

Badge.displayName = 'MDCBadge';

Badge.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    overlap: PropTypes.bool,
    noBackground: PropTypes.bool
};

export default function Badge({
    value,
    overlap = false,
    noBackground = false,

    element: Element = 'span',
    className,
    ...props
}) {
    const classNames = classnames('mdc-badge', {
        'mdc-badge--overlap': overlap,
        'mdc-badge--no-background': noBackground
    }, className);

    return (
        <Element
            className={classNames}
            data-badge={value}
            {...props}
        />
    );
};