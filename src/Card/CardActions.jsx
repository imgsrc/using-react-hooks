import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

CardActions.displayName = 'MDCCardActions';

CardActions.propTypes = {
    fullBleed: PropTypes.bool
};

export default function CardActions({
    fullBleed = false,

    element: Element = 'div',
    className,
    ...props
}) {
    const classNames = classnames('mdc-card__actions', {
        'mdc-card__actions--full-bleed': fullBleed
    }, className);

    return (
        <Element className={classNames} {...props} />
    );
}