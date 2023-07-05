import React from "react";
import Left from "./components/LeftCompt";
import Right from "./components/RightCompt";
import Group1 from "./components/Group1";
import Group2 from "./components/Group2";
import Group3 from "./components/Group3";

const index = () => {
  return (
    <div className="h-full overflow-y-scroll">
      <h1 className="text-black text-2xl pl-10 font-bold">
        Welcome Oluanrawaju
      </h1>

      {/* the yellow navigation at the top of the dashboard page */}
      <div className="flex items-center justify-between w-full gap-[20px] mt-5">
        <Left />
        <Right />
      </div>
      {/* this three components are all the sirp dashboard model */}
      <div className="mt-5">
        <Group1 />
        <Group2 />
        <Group3 />
      </div>
    </div>
  );
};

export default index;
