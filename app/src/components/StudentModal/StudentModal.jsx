import './StudentModal.css'
import PropTypes from 'prop-types'

const StudentModal = (props) => {
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-content flex">
                        <div className="modal-header flex">
                            <button className="modal-close-btn" onClick={props.toggleModal}>
                                <i className="fa-solid fa-xmark fa-xl" style={{color: "#F0ECE5"}}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

StudentModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
}

export default StudentModal;