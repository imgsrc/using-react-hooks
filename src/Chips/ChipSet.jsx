import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

ChipSet.displayName = 'MDCChipSet';

ChipSet.propTypes = {
    choice: PropTypes.bool,
    filter: PropTypes.bool,
    input: PropTypes.bool
};

export default function ChipSet({
    choice = false,
    filter = false,
    input = false,

    element = 'div',
    component: Element = element,
    className,
    ...props
}) {
    const classNames = classnames('mdc-chip-set', {
        'mdc-chip-set--choice': choice,
        'mdc-chip-set--filter': filter,
        'mdc-chip-set--input': input
    }, className);

    return (
        <Element className={classNames} {...props} />
    );
}