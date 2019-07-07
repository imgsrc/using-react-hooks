import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

ListItem.displayName = 'MDCListItem';

ListItem.propTypes = {
    selected: PropTypes.bool,
    activated: PropTypes.bool,
    disabled: PropTypes.bool
};

export default function ListItem({
    selected = false,
    activated = false,
    disabled = false,

    element = 'li',
    component: Element = element,
    className,
    ...props
}) {
    const classNames = classnames('mdc-list-item', {
        'mdc-list-item--selected': selected,
        'mdc-list-item--activated': activated,
        'mdc-list-item--disabled': disabled
    }, className);

    return (
        <Element className={classNames} {...props} />
    );
}