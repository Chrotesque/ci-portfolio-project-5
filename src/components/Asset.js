import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Asset = ({ spinner, src, message, icon, alt }) => {
  const height = 32;
  return (
    <div className={`$styles.Asset}`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {icon && <img src={icon} height={height} width={height} alt={alt} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
