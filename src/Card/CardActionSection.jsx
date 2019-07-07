import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

CardActionSection.displayName = 'MDCCardActionSection';

CardActionSection.propTypes = {
    buttons: PropTypes.bool,
    icons: PropTypes.bool
};

export default function CardActionSection({
    buttons = false,
    icons = false,

    element = 'div',
    component: Element = element,
    className,
    ...props
}) {
    const classNames = classnames({
        'mdc-card__action-buttons': buttons,
        'mdc-card__action-icons': icons
    }, className);

    return (
        <Element className={classNames} {...props} />
    );
}