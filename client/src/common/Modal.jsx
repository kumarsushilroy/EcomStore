
import React from 'react'

const Modal = ({ 
  id, 
  title, 
  children, 
  onSave, 
  saveText = "Save Changes", 
  loader,
  closeText = "Close" }) => {

  return (
    <div>
       <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Body (dynamic content) */}
          <div className="modal-body">{children}</div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {closeText}
            </button>

            {onSave && (
              <button data-bs-dismiss={!loader && 'modal'} type="button" className="btn btn-primary" onClick={onSave}>
                {loader?'adding...':saveText}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
    </div>
  )
}

export default Modal