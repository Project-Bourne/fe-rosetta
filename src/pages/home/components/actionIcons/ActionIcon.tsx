import React from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ActionIcons = ({ docId }) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state?.auth);
  const permissions = userInfo?.role?.permissions || [];

  const handleExport = (id: string, to: string) => {
    if (to === "collab") {
      router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_COLLAB_PORT}/document/${id}&translator`);
    }
    if (to === "analyser") {
      router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_ANALYZER_PORT}/home/${id}&translator`);
    }
    if (to === "factcheck") {
      router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_FACT_CHECKER_PORT}/home/${id}&translator`);
    }
    if (to === "deepchat") {
      router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_DEEP_CHAT_PORT}/home/${id}&translator`);
    }
    if (to === "interrogator") {
      router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_INTERROGATOR_PORT}/home/query/${id}&translator`);
    }
    if (to === "summarizer") {
      router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_SUMMARIZER_PORT}/home/${id}&translator`);
    }
  };

  // Define icons configuration
  const icons = [
    {
      permission: "collab",
      title: "Export to Collab",
      icon: "action_collab.svg",
      action: "collab"
    },
    {
      permission: "fact checker",
      title: "Export to Factchecker",
      icon: "action_factchecker.svg",
      action: "factcheck"
    },
    {
      permission: "analyser",
      title: "Export to Analyzer",
      icon: "action_analyzer.svg",
      action: "analyser"
    },
    {
      permission: "summarizer",
      title: "Export to Summarizer",
      icon: "action_summarizer.svg",
      action: "summarizer"
    },
    {
      permission: "deep chat",
      title: "Export to Deep chat",
      icon: "action_deepchat.svg",
      action: "deepchat"
    },
    {
      permission: "interrogator",
      title: "Export to Interrogator",
      icon: "action_interrogator.svg",
      action: "interrogator"
    }
  ];

  return (
    <div className="w-full px-2 py-2 sm:px-4">
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-2 justify-items-center">
        {icons.map((icon, index) => 
          permissions.includes(icon.permission) && (
            <Tooltip key={index} title={icon.title}>
              <div className="flex items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                <Image
                  src={require(`../../../../../public/icons/${icon.icon}`)}
                  alt={icon.title}
                  className="cursor-pointer w-full h-full hover:scale-110 transition-transform"
                  width={60}
                  height={60}
                  onClick={() => handleExport(docId, icon.action)}
                />
              </div>
            </Tooltip>
          )
        )}
      </div>
    </div>
  );
};

export default ActionIcons;
