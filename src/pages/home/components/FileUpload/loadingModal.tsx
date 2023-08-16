import { useRef, useState } from "react";
import { useOnClickOutside } from "@/components/custom-hooks";
import Image from 'next/image'
import { useTruncate } from "@/components/custom-hooks";

function LoadingModal({ closeModal, formData }) {
    const ref = useRef();
    useOnClickOutside(ref, closeModal);
   const content =  useTruncate(formData, 30)

    return (
        <div className="fixed z-[1020] backdrop-blur-sm w-full h-full top-0 flex items-center justify-center left-0 bottom-0 bg-[#747474]/[0.1] backdrop-brightness-50">
            <div ref={ref} className={`flex items-center justify-center w-full`}>
                <div className="bg-white p-6 rounded-[1rem] w-[40%]">
                    <div className="flex justify-end text-xl">
                        <button onClick={closeModal}> &times; </button>
                    </div>
                    <main className="flex items-center justify-center flex-col gap-4">
                        <h1 className="font-[700] text-2xl">Running Translator</h1>
                        <p className="text-gray-500">{content}</p>
                        <div className="flex items-center justify-center bg-sirp-primary w-[50%] font-bold text-white p-3 rounded-[1rem] gap-3 text-xl ">
                            <span> <Image
                                src={require(`../../../../assets/icons/circle.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                                className="rotate-animation"
                            /></span>
                            <span>Translating</span>
                        </div>


                    </main>
                </div>
            </div>
        </div>
    );
}

export default LoadingModal;
