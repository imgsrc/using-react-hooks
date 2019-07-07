import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

FAB.displayName = 'MDCFAB';

FAB.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string,
    mini: PropTypes.bool,
    extended: PropTypes.bool,
    exited: PropTypes.bool
};

export default function FAB({
    icon,
    label,
    mini = false,
    extended = false,
    exited = false,
    
    element = 'button',
    component: Element = element,
    className,
    children = label,
    ...props
}) {
    const classNames = classnames('mdc-fab', {
        'mdc-fab--mini': mini,
        'mdc-fab--extended': extended,
        'mdc-fab--exited': exited
    }, className);

    return (
        <Element className={classNames} {...props}>
            {icon &&
                React.cloneElement(icon, { className: 'mdc-fab__icon' })
            }

            {children &&
                <span className="mdc-fab__label">{children}</span>
            }
        </Element>
    );
}