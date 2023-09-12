import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";

const DeleteIcon = ({ doc }) => {
 
  return (
    <>
      <div className="flex gap-2 px-5">
        <Tooltip title="Delete">
          <Image
            src={require("../../../../assets/icons/delete.svg")}
            alt="documents"
            className=" cursor-pointer"
            width={15}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default DeleteIcon;
