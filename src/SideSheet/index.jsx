import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import './index.scss';

export default class SideSheet extends React.Component {
    static displayName = 'MDCSideSheet';

    static propTypes = {
        open: PropTypes.bool,
        appear: PropTypes.bool,
        dismissible: PropTypes.bool,
        modal: PropTypes.bool,
        appContentSelector: PropTypes.string,
        onClose: PropTypes.func
    };

    static defaultProps = {
        open: false,
        appear: false,
        dismissible: false,
        modal: false,
        onClose: Function.prototype
    };

    static classNames = {
        ROOT: 'mdc-side-sheet',
        DISMISSIBLE: 'mdc-side-sheet--dismissible',
        MODAL: 'mdc-side-sheet--modal',
        OPEN: 'mdc-side-sheet--open',
        ANIMATE: 'mdc-side-sheet--animate',
        OPENING: 'mdc-side-sheet--opening',
        CLOSING: 'mdc-side-sheet--closing',
        CONTENT: 'mdc-side-sheet__content',
        APP_CONTENT: 'mdc-side-sheet-app-content',
        SCRIM: 'mdc-side-sheet-scrim'
    };

    componentDidMount() {
        if (this.props.dismissible && this.props.appContentSelector) {
            document.querySelector(this.props.appContentSelector).classList.add(SideSheet.classNames.APP_CONTENT);
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

    handleScrimClick = () => this.props.onClose();

    render() {
        const {
            open,
            appear,
            dismissible,
            modal,
            onClose,

            element = 'aside',
            component: Element = element,
            className,
            children,
            ...props
        } = this.props;

        const classNames = classnames(SideSheet.classNames.ROOT, {
            [SideSheet.classNames.DISMISSIBLE]: dismissible,
            [SideSheet.classNames.MODAL]: modal
        }, className);

        return (
            <CSSTransition
                in={open}
                appear={appear}
                timeout={{
                    enter: 250,
                    exit: 200
                }}
                classNames={{
                    appear: `${SideSheet.classNames.OPEN}`,
                    enter: `${SideSheet.classNames.OPEN} ${SideSheet.classNames.ANIMATE}`,
                    enterActive: `${SideSheet.classNames.OPEN} ${SideSheet.classNames.OPENING}`,
                    enterDone: SideSheet.classNames.OPEN,
                    exit: `${SideSheet.classNames.OPEN} ${SideSheet.classNames.CLOSING}`,
                    exitActive: `${SideSheet.classNames.CLOSING}`
                }}
            >
                <React.Fragment>
                    <Element
                        className={classNames}
                        ref={element => this.rootElement = element}
                        {...props}
                    >
                        <div className={SideSheet.classNames.CONTENT}>
                            {children}
                        </div>
                    </Element>

                    {modal &&
                        <div
                            className={SideSheet.classNames.SCRIM}
                            ref={element => this.scrimElement = element}
                            onClick={this.handleScrimClick}
                        />
                    }
                </React.Fragment>
            </CSSTransition>
        );
    }
}