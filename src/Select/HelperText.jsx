import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

HelperText.displayName = 'MDCSelectHelperText';

HelperText.propTypes = {
    persistent: PropTypes.bool,
    validation: PropTypes.bool
};

export default function HelperText({
    persistent = false,
    validation = false,

    element: Element = 'p',
    children,
    ...props
}) {
    const classNames = classnames('mdc-select-helper-text', {
        'mdc-select-helper-text--persistent': persistent,
        'mdc-select-helper-text--validation-msg': validation
    });

    return (
        <Element className={classNames} {...props} />
    );
};