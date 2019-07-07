import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

CardAction.displayName = 'MDCCardAction';

CardAction.propTypes = {
    button: PropTypes.bool,
    icon: PropTypes.bool
};

export default function CardAction({
    button = false,
    icon = false,
    
    component,
    children,
    ...props
}) {
    return (
        React.cloneElement(component || React.Children.only(children), {
            className: classnames('mdc-card__action', {
                'mdc-card__action--button': button,
                'mdc-card__action--icon': icon
            }),
            ...props
        })
    );
};