import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'

import Modal from '../Modal'

Dialog.displayName = 'MDCDialog'

Dialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  appear: PropTypes.bool,
  confirmation: PropTypes.bool,
  onClose: PropTypes.func
}

Dialog.defaultProps = {
  open: false,
  appear: false,
  confirmation: false,
  onClose: Function.prototype
}

Dialog.cssClasses = {
  OPEN: 'mdc-dialog--open',
  OPENING: 'mdc-dialog--opening',
  CLOSING: 'mdc-dialog--closing',
  SCROLLABLE: 'mdc-dialog--scrollable',
  STACKED: 'mdc-dialog--stacked',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock'
}

const Dialog = ({
                  open,
                  appear,
                  confirmation,
                  title,
                  onClose,
                  element: Element = 'div',
                  className,
                  children,
                  ...props
                }) => {

  const rootElement = useRef()
  const contentElement = useRef(document.querySelector('.mdc-dialog__content'))

  useEffect(() => {
    if (open === true) {
      document.body.classList.add(Dialog.cssClasses.SCROLL_LOCK)

      if (isScrollable) {
        rootElement.current.classList.add(Dialog.cssClasses.SCROLLABLE)
      } else {
        rootElement.current.classList.remove(Dialog.cssClasses.SCROLLABLE)
      }

      if (confirmation === false) {
        document.addEventListener('keydown', handleDocumentKeyDown)
      }
    } else if (open === false) {
      document.body.classList.remove(Dialog.cssClasses.SCROLL_LOCK)

      if (confirmation === false) {
        document.removeEventListener('keydown', handleDocumentKeyDown)
      }
    }
  })

  const isScrollable = () => {
    return contentElement ? contentElement.current.scrollHeight > contentElement.current.offsetHeight : false
  }

  const handleDocumentKeyDown = event => {
    if (confirmation) return

    if (event.key && event.key === 'Escape' || event.keyCode === 27) {
      onClose()
    }
  }

  const handleScrimClick = () => {
    if (confirmation) return
    onClose()
  }

  const classNames = classnames('mdc-dialog', className)

  return (
    <CSSTransition
      in={ open }
      timeout={ { enter: 150, exit: 75 } }
      classNames={ {
        appear: 'mdc-dialog--opening',
        appearActive: 'mdc-dialog--open',
        enter: 'mdc-dialog--opening',
        enterActive: 'mdc-dialog--open',
        enterDone: 'mdc-dialog--open',
        exit: 'mdc-dialog--closing'
      } }
      appear={ appear }
      mountOnEnter
      unmountOnExit
    >
      <Modal>
        <Element
          className={ classNames }
          ref={ rootElement }
          role="alertdialog"
          aria-modal="true"
          { ...props }
        >
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface">
              { title && <h2 className="mdc-dialog__title">{ title }</h2> }
              { children }
            </div>
          </div>

          <div className="mdc-dialog__scrim" onClick={ handleScrimClick }/>
        </Element>
      </Modal>
    </CSSTransition>
  )
}

export default Dialog