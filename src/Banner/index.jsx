import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

Banner.displayName = 'MDCBanner';

Banner.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.node,
    action: PropTypes.node,
    persistent: PropTypes.bool
};

export default function Banner({
    icon,
    text,
    action,
    persistent = false,

    element = 'div',
    component: Element = element,
    className,
    children = text,
    ...props
}) {
    const classNames = classnames('mdc-banner', {
        'mdc-banner--persistent': persistent
    }, className);

    return (
        <Element className={classNames} {...props}>
            <div className="mdc-banner__content">
                {icon && React.cloneElement(icon, { className: 'mdc-banner__icon' })}

                {React.isValidElement(children) ?
                    React.cloneElement(children, { className: 'mdc-banner__text' })
                    :
                    <div className="mdc-banner__text">{children}</div>
                }

                {action && React.cloneElement(action, { className: 'mdc-banner__action' })}
            </div>
        </Element>
    );
};