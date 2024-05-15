import React from "react";
import { BallTriangle } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <BallTriangle
          color="#4fa94d"
          height={100}
          width={100}
          radius={5}
          visible={true}
        />
      </div>
    </div>
  );
}
