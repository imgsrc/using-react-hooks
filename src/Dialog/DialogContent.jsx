import React from 'react';

DialogContent.displayName = 'MDCDialogContent';

export default function DialogContent({ children }) {
    return (
        <div className="mdc-dialog__content">
            {children}
        </div>
    );
}