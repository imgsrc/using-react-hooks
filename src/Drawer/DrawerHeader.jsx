import React from 'react';
import PropTypes from 'prop-types';

DrawerHeader.displayName = 'MDCDrawerHeader';

DrawerHeader.propTypes = {
    graphic: PropTypes.element,
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default function DrawerHeader({
    graphic,
    title,
    subtitle,
    
    children,
    ...props
}) {
    return (
        <div className="mdc-drawer__header" {...props}>
            {graphic && React.cloneElement(graphic, { className: 'mdc-drawer__graphic' })}

            {title && <h3 className="mdc-drawer__title">{title}</h3>}

            {subtitle && <h6 className="mdc-drawer__subtitle">{subtitle}</h6>}

            {children}
        </div>
    );
};