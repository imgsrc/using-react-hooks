import React from 'react';
import classnames from 'classnames';

ListGroup.displayName = 'MDCListGroup';

export default function ListGroup({
    element: Element = 'div',
    className,
    ...props
}) {
    const classNames = classnames('mdc-list-group', className);

    return (
        <Element className={classNames} {...props} />
    );
}