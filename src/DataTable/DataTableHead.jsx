import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

DataTableHead.displayName = 'MDCDataTableHead';

DataTableHead.propTypes = {
    sort: PropTypes.oneOf(['asc', 'desc'])
};

export default function DataTableHead({ sort, className, ...props }) {
    const classNames = classnames('mdc-data-table__head', {
        'mdc-data-table__head--sorted-ascending': sort === 'asc',
        'mdc-data-table__head--sorted-descending': sort === 'desc',
    }, className);

    return (
        <thead className={classNames} {...props} />
    );
}