import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

LayoutGrid.displayName = 'MDCLayoutGrid';

LayoutGrid.propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    fixedColumnWidth: PropTypes.bool
};

export default function LayoutGrid({
    align,
    fixedColumnWidth = false,

    element = 'div',
    component = element,
    className,
    children,
    ...props
}) {
    const Element = component;
    const classNames = classnames('mdc-layout-grid', {
        [`mdc-layout-grid--align-${align}`]: align,
        'mdc-layout-grid--fixed-column-width': fixedColumnWidth
    }, className);

    return (
        <Element className={classNames} {...props}>
            <div className="mdc-layout-grid__inner">{children}</div>
        </Element>
    );
}