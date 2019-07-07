import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

ListGroupSubheader.displayName = 'MDCListGroupSubheader';

ListGroupSubheader.propTypes = {
    title: PropTypes.string
};

export default function ListGroupSubheader({
    title,

    element: Element = 'h3',
    className,
    children = title,
    ...props
}) {
    const classNames = classnames('mdc-list-group__subheader', className);

    return (
        <Element className={classNames} {...props}>{children}</Element>
    );
}