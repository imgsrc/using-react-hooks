import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Modal from '../Modal';

import './index.scss';

export default class Snackbar extends React.Component {
    static displayName = 'MDCSnackbar';

    static propTypes = {
        open: PropTypes.bool,
        appear: PropTypes.bool,
        stacked: PropTypes.bool,
        leading: PropTypes.bool,
        timeout: PropTypes.number,
        closeOnEscape: PropTypes.bool,
        onClose: PropTypes.func
    };

    static defaultProps = {
        open: false,
        appear: false,
        stacked: false,
        leading: false,
        timeout: 5000,
        closeOnEscape: true,
        onClose: Function.prototype
    };

    componentDidUpdate(prevProps) {
        if (this.props.open && !prevProps.open) {
            this.timeout = setTimeout(() => {
                this.close();
            }, this.props.timeout);
        } else if (!this.props.open && prevProps.open) {
            if (this.timeout) {
                this.clearTimeout();
            }
        }
    }

    handleKeyDown = event => {
        if (this.props.closeOnEscape && event.key === 'Escape' || event.keyCode === 27) {
            this.close();
        }
    };

    clearTimeout() {
        clearTimeout(this.timeout);
        this.timeout = null;
    }

    close() {
        this.clearTimeout();
        this.props.onClose();
    }

    render() {
        const {
            open,
            appear,
            timeout,
            label,
            actions,
            dismissIcon,
            stacked,
            leading,
            closeOnEscape,
            onClose,

            className,
            children = label,
            ...props
        } = this.props;

        const classNames = classnames('mdc-snackbar', {
            'mdc-snackbar--stacked': stacked,
            'mdc-snackbar--leading': leading
        }, className);

        return (
            <CSSTransition
                in={open}
                timeout={{ enter: 150, exit: 75 }}
                classNames={{
                    appear: 'mdc-snackbar--opening',
                    appearActive: 'mdc-snackbar--open',
                    enter: 'mdc-snackbar--opening',
                    enterActive: 'mdc-snackbar--open',
                    enterDone: 'mdc-snackbar--open',
                    exit: 'mdc-snackbar--closing'
                }}
                appear={appear}
                mountOnEnter
                unmountOnExit
            >
                <Modal>
                    <div
                        className={classNames}
                        onKeyDown={this.handleKeyDown}
                        {...props}
                    >
                        <div className="mdc-snackbar__surface">
                            <div className="mdc-snackbar__label" role="status" aria-level="polite">{children}</div>

                            {actions &&
                                <div className="mdc-snackbar__actions">
                                    {actions.map((action, index) => React.cloneElement(action, {
                                        key: index,
                                        className: action.props.dismiss ? 'mdc-snackbar__dismiss' : 'mdc-snackbar__action',
                                        dismiss: undefined
                                    }))}
                                </div>
                            }
                        </div>
                    </div>
                </Modal>
            </CSSTransition>
        );
    }
}