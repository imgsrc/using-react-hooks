import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

HelperText.displayName = 'MDCTextFieldHelperText';

HelperText.PropTypes = {
    persistent: PropTypes.bool,
    validation: PropTypes.bool
};

export default function HelperText({
    persistent = false,
    validation = false,

    element: Element = 'p',
    ...props
}) {
    const classNames = classnames('mdc-text-field-helper-text', {
        'mdc-text-field-helper-text--persistent': persistent,
        'mdc-text-field-helper-text--validation-msg': validation
    });

    return (
        <Element className={classNames} {...props} />
    );
};