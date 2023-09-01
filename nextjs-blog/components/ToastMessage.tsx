const ToastMessage = ({ showToast }) => {
  return (
    <div>
      {showToast && (
        <div className="toast toast-center">
          {/* <div className="alert alert-warning">
            <span>Oops! You missed some required fields.</span>
          </div> */}
          <div className="alert alert-success">
            <i className="text-xl fa-regular fa-circle-check"></i>
            <span className="text-xl">Thanks for your message!</span>
            <span className="text-xl">We will email you back promptly.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToastMessage;
