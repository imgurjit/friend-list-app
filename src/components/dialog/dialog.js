import "./dialog.css";

function Dialog(props) {
  return (
    <>
      <div id="myModal" className="modal" style={{ display: props.isOpenModal ? "block" : "none" }}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              props.closeModal("close");
            }}>
            &times;
          </span>
          <p>Are you sure you want to delete {props.nameToBeDeleted} ?</p>
          <div className="action-btn-wrapper">
            <button
              className="yes-btn"
              onClick={() => {
                props.closeModal("YES");
              }}>
              YES
            </button>

            <button
              onClick={() => {
                props.closeModal("NO");
              }}>
              NO
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dialog;
