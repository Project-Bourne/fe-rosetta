import React from "react";
import Image from "next/image";

function RightCompt() {
  return (
    <div className="mr-10 bg-sirp-primary1 h-28 drop-shadow-md rounded-[1.5rem] flex items-center gap-[1.5rem] basis-1/2">
      <div>
        <div className="flex flex-row items-center gap-2">
          <div>
            <Image
              src={require("../../../assets/icons/Frame 3.svg")}
              alt="crawled-content"
              className="pl-10 cursor-pointer"
              width={100}

            />
          </div>
          <div>
            <p className= "font-bold">4000</p>
            <span className="font-light">Total content crawled</span>
          </div>
        </div>
      </div>
      <hr className="border-black h-0 my-4" />
      <div>
        <div className="flex flex-row items-center gap-2 border-l h-28 border-black border-opacity-5">
          <div>
            <Image
              src={require("../../../assets/icons/Frame 4.svg")}
              alt="total-archives"
              className="pl-10 cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="font-light">Total archives</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightCompt;
