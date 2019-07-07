import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './index.scss';

export default class Modal extends React.Component {
    static displayName = 'MDCModal';

    static propTypes = {
        fixed: PropTypes.bool,
        element: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        fixed: false,
        element: 'div'
    };

    componentWillMount() {
        this.root = document.createElement(this.props.element);
        
        this.root.className = 'mdc-modal';

        if (this.props.fixed) {
            this.root.classList.add('mdc-modal--fixed');
        }

        document.body.appendChild(this.root);
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.root
        );
    }
}