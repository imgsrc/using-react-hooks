import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

Avatar.displayName = 'MDCAvatar';

Avatar.propTypes = {
    src: PropTypes.string,
    small: PropTypes.bool,
    large: PropTypes.bool
};

export default function Avatar({
    src,
    small = false,
    large = false,
    
    element = 'div',
    component: Element = element,
    className,
    children,
    ...props
}) {
    const classNames = classnames('mdc-avatar', {
        'mdc-avatar--small': small,
        'mdc-avatar--large': large
    }, className);

    return (
        <Element className={classNames} {...props}>
            {src ?
                <img src={src} className="mdc-avatar__image" />
                :
                React.isValidElement(children) ?
                    React.cloneElement(children, {
                        className: 'mdc-avatar__icon'
                    })
                    :
                    <span className="mdc-avatar__text">{children}</span>
            }
        </Element>
    );
};