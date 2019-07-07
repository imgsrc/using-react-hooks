import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

DataTable.displayName = 'MDCDataTable';

DataTable.propTypes = {
    selectable: PropTypes.bool
};

export default function DataTable({ selectable = false, className, ...props }) {
    const classNames = classnames('mdc-data-table', {
        'mdc-data-table--selectable': selectable
    }, className);

    return (
        <table className={classNames} {...props} />
    );
}