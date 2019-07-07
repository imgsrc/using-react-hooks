import React from 'react';

DataTableRow.displayName = 'MDCDataTableRow';

export default function DataTableRow(props) {
    return (
        <tr className="mdc-data-table__row" {...props} />
    );
}