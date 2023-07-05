import Image from "next/image";
import React, { useState } from "react";
import { InputModel, DropdownModel } from "@/models/ui/components.models";


function Input(props: InputModel) {
    const { type, value, onChange, placeholder, classNameStyle, isDisabled } = props;
    const [ toggle, setToggle ] = useState(false);

    const handleToggle = () => {
        setToggle(prevState => !prevState);
    }

    return(
        <>
            {type === 'password' ?   // add toggle button, if input type is password
                <div className="flex w-full">
                    <input
                        className={`w-[90%] py-2 px-3 font-light rounded-l border-y-2 border-l-2 border-r-0 border-y-gray-100 border-l-gray-100 focus:border-gray-100 outline-none ${classNameStyle}`}
                        value={value}
                        placeholder={placeholder}
                        type={toggle ? 'text' : 'password'}
                        readOnly={isDisabled}
                        onChange={onChange}
                    /> 
                    <div
                        className="w-[10%] rounded-r border-y-2 border-r-2 border-l-0 border-y-gray-100 border-r-gray-100 focus:border-gray-100 outline-none flex justify-center"
                        onClick={handleToggle}>
                           { !toggle ?
                           <Image
                                src={require("../../assets/icons/Hide.svg")}
                                alt="Filter"
                                width={20}
                                height={20}
                                className=''
                                priority
                            /> : 
                            <></>
                            }
                    </div>
                </div>
            :
            <input
                className={`w-full py-2 px-3 rounded-md border-[1px] font-light border-gray-100 focus:border-gray-100 outline-none ${classNameStyle}`}
                value={value}
                placeholder={placeholder}
                type={type}
                readOnly={isDisabled}
                onChange={onChange}
            /> 
        }
        </>
        
    )
}



function Dropdown(props: DropdownModel){
    const { data, onChange, className } = props;

    return(
        <>
            <select  
                className={`w-full py-2 px-3 rounded-md border-[1px] border-gray-100 focus:border-gray-100 outline-none ${className}` }
                onChange={onChange}> 
            { data?.map((item: {id:number, role: string}) => (
                <option key={item?.id} value={item?.role} className="text-[12px]">{item?.role}</option>
            ))}
            </select>
        </>
    )
}




function DropdownWithFlag(props: DropdownModel) {
    const { data, onClick, selectItem, className, style, isDisabled } = props;
    const [ dropdown, setDropdown ] = useState(false);
    const [ country, setCountry ] = useState({
        name: 'Nigeria',
        flag: 'https://flagcdn.com/ng.svg'
    })

    const handleDropdown = () => {
        !isDisabled && setDropdown(prevState => !prevState)
    }

    const handleItemSelect = (country, flag) => {
        selectItem(country)
        setCountry({ name: country, flag })
        setDropdown(false)
    }

    const Menu = () => {
        return(
            <div className={`h-[170px] w-full shadow-md overflow-scroll bg-white absolute z-7`}>
                { data.map((item: any, index: number) => (
                    <div 
                    key={index} 
                    className={`flex gap-2 px-2 py-1 hover:bg-gray-200 cursor-pointer items-center`}
                    onClick={() => handleItemSelect(item.name, item.flags.svg)}>
                        <div>
                            <Image
                                src={item.flags.svg}
                                alt="Filter"
                                height={20}
                                width={20}
                                className='rounded-full h-[20px] w-[20px]'
                                priority
                            /> 
                        </div>
                        <div className="text-base font-light">{item.name}</div>
                    </div>
                ))}
            </div>
        )
    }

    return(
        <div className={`relative ${style}`}>
            <div 
                className={`flex justify-between items-center py-2 px-3 rounded-md border-[1px] border-gray-100 `}
                onClick={handleDropdown}>
                <div className="flex gap-2 items-center">
                    <Image
                        src={country.flag}
                        alt="Filter"
                        height={20}
                        width={20}
                        className='rounded-full h-[20px] w-[20px]'
                        priority
                    /> 
                    <div className="text-base font-light">{country.name}</div>
                </div>
                <div>&#8964; </div>
            </div>
            { dropdown && <Menu /> }
        </div>
    )
}



export { Input, Dropdown, DropdownWithFlag};