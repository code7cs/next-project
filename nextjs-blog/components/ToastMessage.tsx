type ToastMessageProps = {
  isSuccess: boolean;
  message?: string;
};

/**
 * isSuccess === true - contact us form success message.
 * isSuccess === false - Sign-in/Sign-up error message.
 */
const ToastMessage = ({
  isSuccess,
  message = "",
}: ToastMessageProps) => {
  return (
    <div className="toast toast-center">
      {isSuccess ? (
        <div className="alert alert-success bg-green font-medium">
          <i className="text-xl fa-regular fa-circle-check"></i>
          <span className="text-xl">Thanks for your message!</span>
          <span className="text-xl">We will email you back promptly.</span>
        </div>
      ) : (
        <div className="alert alert-warning font-bold">
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default ToastMessage;
