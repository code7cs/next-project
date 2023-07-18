const ToastMessage = ({showToast }) => {
  return (
    <div>
      {showToast && (
        <div className="toast toast-center">
          {/* <div className="alert alert-warning">
            <span>Oops! You missed some required fields.</span>
          </div> */}
          <div className="alert alert-success">
            <span>Thanks for your message!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToastMessage;
