import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

LayoutGridCell.displayName = 'MDCLayoutGridCell';

LayoutGridCell.propTypes = {
    span: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    desktop: PropTypes.number,
    tablet: PropTypes.number,
    mobile: PropTypes.number,
    order: PropTypes.number,
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
    grid: PropTypes.bool
};

export default function LayoutGridCell({
    span,
    desktop,
    tablet,
    mobile,
    order,
    align,
    grid = false,

    element = 'div',
    component = element,
    className,
    children,
    ...props
}) {
    const Element = component;
    const classNames = classnames('mdc-layout-grid__cell', {
        [`mdc-layout-grid__cell--span-${span}`]: span,
        [`mdc-layout-grid__cell--span-${desktop}-desktop`]: desktop,
        [`mdc-layout-grid__cell--span-${tablet}-tablet`]: tablet,
        [`mdc-layout-grid__cell--span-${mobile}-mobile`]: mobile,
        [`mdc-layout-grid__cell--order-${order}`]: order,
        [`mdc-layout-grid__cell--align-${align}`]: align
    }, className);

    return (
        <Element className={classNames} {...props}>
            {grid ?
                <div className="mdc-layout-grid__inner">
                    {children}
                </div>
                :
                children
            }
        </Element>
    );
}