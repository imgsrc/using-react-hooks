import React from 'react';
import classnames from 'classnames';

ListItemGraphic.displayName = 'MDCListItemGraphic';

export default function ListItemGraphic({
    className,
    children,
    ...props
}) {
    return React.cloneElement(React.Children.only(children), {
        className: classnames('mdc-list-item__graphic', className),
        ...props
    });
}