import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import Modal from '../Modal';

import './index.scss';

export default class MenuSurface extends React.Component {
    static displayName = 'MDCMenuSurface';

    static propTypes = {
        open: PropTypes.bool,
        anchor: PropTypes.object,
        top: PropTypes.bool,
        left: PropTypes.bool,
        bottom: PropTypes.bool,
        right: PropTypes.bool,
        onClose: PropTypes.func
    };

    static defaultProps = {
        open: false,
        top: false,
        left: false,
        bottom: false,
        right: false,
        onClose: Function.prototype
    };

    setStyle() {
        if (!this.root || !this.props.anchor) return;

        const { anchor, top, left, bottom, right } = this.props;
        const { clientWidth: width, clientHeight: height } = this.root;
        const anchorDimensions = anchor.getBoundingClientRect();
        const style = {
            position: 'absolute',
            transformOrigin: ''
        };
        
        if (left || !right) {
            const left = anchorDimensions.left;
            const right = left + width;
            const delta = window.innerWidth - right;

            style.left = `${delta > 0 ? left : left - Math.abs(delta)}px`;
            style.transformOrigin += 'left';
        } else if (right) {
            const left = anchorDimensions.right - width;

            style.left = `${left > 0 ? left : 0}px`;
            style.transformOrigin += 'right';
        }

        if (top || !bottom) {
            const top = anchorDimensions.top + window.scrollY;
            const bottom = anchorDimensions.top + height;
            const delta = window.innerHeight - bottom;

            style.top = `${delta > 0 ? top : top - Math.abs(delta)}px`;
            style.transformOrigin += ' top';
        } else if (bottom) {
            const top = anchorDimensions.bottom - height + window.scrollY;
            
            style.top = `${top > 0 ? top : 0}px`;
            style.transformOrigin += ' bottom';
        }

        this.root.style.left = style.left;
        this.root.style.top = style.top;
        this.root.style.position = style.position;
        this.root.style.transformOrigin = style.transformOrigin;
    }

    shouldComponentUpdate(nextProps) {
        return this.props.open !== nextProps.open;
    }

    componentDidUpdate(prevProps) {
        if (this.props.open === true && prevProps.open === false) {
            document.body.addEventListener('click', this.handleBodyClick);
            this.setStyle();
        } else if (this.props.open === false && prevProps.open === true) {
            document.body.removeEventListener('click', this.handleBodyClick);
        }
    }

    handleBodyClick = () => this.props.onClose();

    render() {
        const { open, anchor, top, left, bottom, right, element, className, ...props } = this.props;
        
        return (
            <CSSTransition
                in={open}
                timeout={{ enter: 120, exit: 75 }}
                classNames={{
                    enter: 'mdc-menu-surface--animating-open',
                    enterActive: 'mdc-menu-surface--open',
                    enterDone: 'mdc-menu-surface--open',
                    exit: 'mdc-menu-surface--animating-closed'
                }}
                mountOnEnter
                unmountOnExit
            >
                <Modal>
                    <div
                        className={classnames('mdc-menu-surface', className)}
                        ref={element => this.root = element}
                        tabIndex={open ? '0' : '-1'}
                        {...props}
                    />
                </Modal>
            </CSSTransition>
        );
    }
}