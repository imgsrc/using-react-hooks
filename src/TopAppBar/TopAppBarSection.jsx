import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

TopAppBarSection.displayName = 'MDCTopAppBarSection';

TopAppBarSection.propTypes = {
    alignStart: PropTypes.bool,
    alignEnd: PropTypes.bool
};

export default function TopAppBarSection({
    alignStart = false,
    alignEnd = false,

    element: Element = 'section',
    className,
    ...props
}) {
    const classNames = classnames('mdc-top-app-bar__section', {
        'mdc-top-app-bar__section--align-start': alignStart,
        'mdc-top-app-bar__section--align-end': alignEnd
    }, className);

    return (
        <Element className={classNames} {...props} />
    );
}