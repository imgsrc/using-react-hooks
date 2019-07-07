import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import Modal from '../Modal';

export default class Drawer extends React.Component {
    static displayName = 'MDCDrawer';

    static propTypes = {
        open: PropTypes.bool,
        dismissible: PropTypes.bool,
        modal: PropTypes.bool,
        onClose: PropTypes.func
    };

    static defaultProps = {
        open: false,
        dismissible: false,
        modal: false,
        onClose: Function.prototype
    };

    componentDidMount() {
        if (this.props.dismissible) {
            if (this.props.appContentSelector) {
                document.querySelector(this.props.appContentSelector).classList.add('mdc-drawer-app-content');
            } else {
                this.rootElement.nextElementSibling.classList.add('mdc-drawer-app-content');
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.modal) {
            if (this.props.open === true && prevProps.open === false) {
                document.addEventListener('keydown', this.handleDocumentKeyDown);
            } else if (this.props.open === false && prevProps.open === true) {
                document.removeEventListener('keydown', this.handleDocumentKeyDown);
            }
        }
    }

    handleDocumentKeyDown = event => {
        if (event.key && event.key === 'Escape' || event.keyCode === 27) {
            this.props.onClose();
        }
    };

    handleScrimClick = event => this.props.onClose();

    render() {
        const {
            open,
            dismissible,
            modal,
            onClose,

            element = 'aside',
            component: Element = element,
            className,
            children,
            ...props
        } = this.props;

        const classNames = classnames('mdc-drawer', {
            'mdc-drawer--dismissible': dismissible,
            'mdc-drawer--modal': modal
        }, className);

        return (
            <CSSTransition
                in={open}
                appear={true}
                timeout={{
                    enter: 250,
                    exit: 200
                }}
                classNames={{
                    appear: 'mdc-drawer--open',
                    enter: 'mdc-drawer--open mdc-drawer--animate',
                    enterActive: 'mdc-drawer--open mdc-drawer--opening',
                    enterDone: 'mdc-drawer--open',
                    exit: 'mdc-drawer--open mdc-drawer--closing',
                    exitActive: 'mdc-drawer--closing'
                }}
                mountOnEnter={modal}
                unmountOnExit={modal}
            >
                {modal ?
                    <Modal fixed>
                        <Element
                            ref={element => this.rootElement = element}
                            className={classNames}
                            {...props}
                        >
                            {children}
                        </Element>

                        <div
                            ref={element => this.scrimElement = element}
                            className="mdc-drawer-scrim"
                            onClick={this.handleScrimClick}
                        />
                    </Modal>
                    :
                    <Element
                        ref={element => this.rootElement = element}
                        className={classNames}
                        {...props}
                    >
                        {children}
                    </Element>
                }
            </CSSTransition>
        );
    }
}