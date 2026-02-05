import React from "react";
import {ThreeDots} from 'react-loader-spinner'

const Loader = () => {
  return (
    <div>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ margin: "20px" }}
        wrapperClass="custom-loader"
        visible={true}
      />
    </div>
  );
};

export default Loader;
