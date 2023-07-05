import Image from "next/image";
import { useState } from "react";



function Tab({ tabHeaderContents, tabBodyContents }) {
    const [ toggleIndex, setToggleIndex ] = useState<number>(0)

    return(
        <>
        {   /* tab headers  */}
            <div className="w-full pt-3 border-b-[1px] border-b-gray-100">
                <ul className="w-[80%] flex flex-wrap md:flex-nowrap gap-x-1 md:gap-x-3">
                    {tabHeaderContents.map(content => (
                        <li 
                        onClick={() => setToggleIndex(content.id)}
                        className={`flex px-3 md:px-8 pb-2 pt-1 font-light text-xs hover:text-sirp-primary hover:border-b-2 hover:border-b-sirp-primary active:text-sirp-primary transition ease-in-out ${toggleIndex === content.id ? 'text-sirp-primary border-b-2 border-b-sirp-primary' : 'text-gray-800'}`}
                        >
                            {content?.icon && 
                            <Image
                                src={content?.icon}
                                alt={content.title}
                                height={13}
                                width={13}
                                className="bg-gray-800 hover:bg-sirp-primary active:bg-sirp-primary"
                                />
                            }
                            <label>{content.title}</label>
                        </li>
                    ))}
                </ul>
            </div>
            {/* tab body  */}
            <div>
            {tabBodyContents.map((content) => (
                <>
                    {toggleIndex === content.id && content.component}
                </>
            ))}
            </div>
        </>
    )
}

export default Tab