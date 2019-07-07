import React from 'react';

DialogTitle.displayName = 'MDCDialogTitle';

export default function DialogTitle({ children }) {
    return React.isValidElement(children) ?
        React.cloneElement(children, { className: "mdc-dialog__title" })
        :
        <h2 className="mdc-dialog__title">{children}</h2>;
}