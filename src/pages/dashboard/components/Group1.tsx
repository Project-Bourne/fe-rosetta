import React from "react";
import Image from "next/image";

function Group1() {
  return (
    <div className="flex flex-row gap-5 ml-5 mr-5">
      <div className="border border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2 basis-1/3 h-[12rem] mt-5  pt-3">
        <div>
          <div className="flex flex-row items-center gap-3 pt-5">
            <div>
              <Image
                src={require("../../../assets/icons/Frame 5.svg")}
                alt="documents"
                className="pl-10 cursor-pointer"
                width={130}
              />
            </div>
            <div>
              <p className="font-bold">4000</p>
              <span className="font-light text-sirp-grey">
                Total content crawled
              </span>
            </div>
          </div>
        </div>
        <div className="ml-6 pt-8 ">
          <button className=" border border-sirp-dashbordb w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashbordb hover:text-white text-sirp-dashbordb font-bold">
            Open SIRP
          </button>
        </div>
      </div>
      <div className="border border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2 basis-1/3 h-[12rem] mt-5  pt-3">
        <div>
          <div className="flex flex-row items-center gap-3 pt-5">
            <div>
              <Image
                src={require("../../../assets/icons/Frame 6.svg")}
                alt="documents"
                className="pl-10 cursor-pointer"
                width={115}
              />
            </div>
            <div>
              <p className="font-bold">4000</p>
              <span className="font-light text-sirp-grey">Total users</span>
            </div>
          </div>
        </div>
        <div className="ml-6 pt-8 ">
          <button className=" border border-sirp-dashbordb3 hover: w-[20rem] pb-2 pt-2 rounded-[1rem] text-sirp-dashbordb3a hover:bg-sirp-dashbordb3a hover:text-white font-bold ">
            Invite collaborators
          </button>
        </div>
      </div>
      <div className="border border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2 basis-1/3 h-[12rem] mt-5  pt-3">
        <div>
          <div className="flex flex-row items-center gap-3 pt-5">
            <div>
              <Image
                src={require("../../../assets/icons/Frame 7.svg")}
                alt="documents"
                className="pl-10 cursor-pointer"
                width={130}
              />
            </div>
            <div>
              <p className="font-bold">4000</p>
              <span className="font-light text-sirp-grey">
                Total exports to collab
              </span>
            </div>
          </div>
        </div>
        <div className="ml-6 pt-8 ">
          <button className=" border border-sirp-dashbordb w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashbordb hover:text-white text-sirp-dashbordb font-bold">
            Open collab workspace
          </button>
        </div>
      </div>
    </div>
  );
}

export default Group1;
