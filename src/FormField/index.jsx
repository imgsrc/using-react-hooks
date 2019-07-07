import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

FormField.displayName = 'MDCFormField';

FormField.propTypes = {
    label: PropTypes.string,
    alignEnd: PropTypes.bool
};

export default function FormField({
    label,
    alignEnd = false,

    className,
    children,
    ...props
}) {
    const classNames = classnames('mdc-form-field', {
        'mdc-form-field--align-end': alignEnd
    }, className);

    return (
        <div className={classNames} {...props}>
            {children}

            {label && <label>{label}</label>}
        </div>
    );
}