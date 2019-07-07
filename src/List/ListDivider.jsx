import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

ListDivider.displayName = 'MDCListDivider';

ListDivider.propTypes = {
    inset: PropTypes.bool,
    padded: PropTypes.bool
};

export default function ListDivider({
    inset = false,
    padded = false,

    element: Element = 'li',
    className,
    ...props
}) {
    const classNames = classnames('mdc-list-divider', {
        'mdc-list-divider--inset': inset,
        'mdc-list-divider--padded': padded,
    }, className);

    return (
        <Element
            className={classNames}
            role={Element === 'li' ? 'separator' : undefined}
            {...props}
        />
    );
};