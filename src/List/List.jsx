import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

List.displayName = 'MDCList';

List.propTypes = {
    dense: PropTypes.bool,
    twoLine: PropTypes.bool,
    avatarList: PropTypes.bool,
    nonInteractive: PropTypes.bool
};

export default function List({
    dense = false,
    twoLine = false,
    avatarList = false,
    nonInteractive = false,

    element: Element = 'ul',
    className,
    ...props
}) {
    const classNames = classnames('mdc-list', {
        'mdc-list--dense': dense,
        'mdc-list--two-line': twoLine,
        'mdc-list--avatar-list': avatarList,
        'mdc-list--non-interactive': nonInteractive
    }, className);

    return (
        <Element className={classNames} {...props} />
    );
}