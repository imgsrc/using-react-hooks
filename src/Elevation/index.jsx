import React from 'react';
import classnames from 'classnames';

import './index.scss';

export default function MDCElevation({
    z = 0,
    transition = false,

    element = 'div',
    component: Element = element,
    className,
    ...props
}) {
    const classNames = classnames('mdc-elevation', {
        [`mdc-elevation--z${z}`]: z,
        'mdc-elevation-transition': transition
    });

    return (
        <Element className={classNames} {...props} />
    );
}