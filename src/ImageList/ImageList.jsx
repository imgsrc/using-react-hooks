import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

ImageList.displayName = 'MDCImageList';

ImageList.propTypes = {
    masonry: PropTypes.bool,
    withTextProtection: PropTypes.bool
};

export default function ImageList({
    masonry = false,
    withTextProtection = false,

    element: Element = 'ul',
    className,
    ...props
}) {
    const classNames = classnames('mdc-image-list', {
        'mdc-image-list--masonry': masonry,
        'mdc-image-list--with-text-protection': withTextProtection
    }, className);

    return (
        <Element className={classNames} {...props} />
    );
}