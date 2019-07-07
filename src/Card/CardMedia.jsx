import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

CardMedia.displayName = 'MDCCardMedia';

CardMedia.propTypes = {
    image: PropTypes.string,
    content: PropTypes.node,
    square: PropTypes.bool,
    wide: PropTypes.bool
};

export default function CardMedia({
    image,
    content,
    square = false,
    wide = false,

    element = 'div',
    component: Element = element,
    className,
    children,
    ...props
}) {
    const classNames = classnames('mdc-card__media', {
        'mdc-card__media--square': square,
        'mdc-card__media--16-9': wide,
    }, className);
    
    const style = image && {
        backgroundImage: `url(${image})`
    };

    return (
        <Element className={classNames} style={style} {...props}>
            {content && <div className="mdc-card__media-content">{content}</div>}
            {children}
        </Element>
    );
}