const CouponAlert = ({}) => {
  return (
    <div className="alert shadow-lg flex justify-center items-center fixed rounded-none text-darkgreen z-10">
      <i
        className="fa-solid fa-gift fa-flip"
        style={{ animationDuration: "4s" }}
      ></i>
      <div>
        <h3 className="font-bold">Gift Certificates Available in Store!</h3>
      </div>
    </div>
  );
};

export default CouponAlert;
