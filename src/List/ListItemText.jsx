import React from 'react';
import PropTypes from 'prop-types';

ListItemText.displayName = 'MDCListItemText';

ListItemText.propTypes = {
    primary: PropTypes.node,
    secondary: PropTypes.node
};

export default function ListItemText({
    primary,
    secondary,

    children,
    ...props
}) {
    return (
        <span className="mdc-list-item__text" {...props}>
            {primary && <span className="mdc-list-item__primary-text">{primary}</span>}
            {secondary && <span className="mdc-list-item__secondary-text">{secondary}</span>}
            {children}
        </span>
    );
}