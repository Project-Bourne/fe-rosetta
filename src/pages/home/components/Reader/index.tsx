import React from 'react'
import Image from 'next/image';

export default function Reader() {
    return (
        <div className='relative'>
            <div className='m-5 grid grid-cols-2 gap-4 '>
                <div className="row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] max-h-[60vh] overflow-y-scroll border-2 border-[#E5E7EB] bg-[#fff]">
                    <span className='font-light text-[#383E42]'>Content</span>
                    <p className='text-[#383E42] text-sm pt-3'> 本网站由 Web3D Media Incorporated 运营，该公司位于特拉华州，注册地址为 651 N Broad St, New Castle, Delaware United States。 （“公司”）。

                        这些使用条款（“条款”）约束用户（“用户”或“用户”，如适用）访问、浏览和使用 https://web3d.media/，包括其任何子域和/或部分 （“网站”）; 以及通过网站提供的服务（“服务”或“服务”，如适用），包括下载和使用某些内容。

                        访问和使用本网站意味着用户已阅读并毫无例外地接受这些条款的约束。 如果用户不接受本条款或对本条款的任何部分有任何异议，则用户不得使用本网站。

                        公司可能随时修改条款，因此我们建议用户定期查看条款。 开头的日期本网站由 Web3D Media Incorporated 运营，该公司位于特拉华州，注册地址为 651 N Broad St, New Castle, Delaware United States。 （“公司”）。

                        这些使用条款（“条款”）约束用户（“用户”或“用户”，如适用）访问、浏览和使用 https://web3d.media/，包括其任何子域和/或部分 （“网站”）; 以及通过网站提供的服务（“服务”或“服务”，如适用），包括下载和使用某些内容。

                        访问和使用本网站意味着用户已阅读并毫无例外地接受这些条款的约束。 如果用户不接受本条款或对本条款的任何部分有任何异议，则用户不得使用本网站。

                        公司可能随时修改条款，因此我们建议用户定期查看条款。 开头的日期
                        Likewise, in respect of collection and processing of personal data, the Privacy Policy will apply.</p>
                </div>
                <div className="row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] overflow-y-scroll border-[#E5E7EB] bg-[#fff]">
                    <span className='font-light text-[#383E42]'>Content</span>
                    <p className='text-[#383E42] text-sm pt-3'>
                        This website is operated by Web3D Media Incorporated, a Delaware-based corporation with a registered address at 651 N Broad St, New Castle, Delaware United States. (“Company”).

                        These terms of use (“Terms”) govern the access, browsing and use by the users (“User” or “Users”, as applicable) of https://web3d.media/, including any of its subdomains and/or sections (“Website”); as well as the services rendered through the Website (“Service” or  “Services”, as applicable) which include the download and use of certain content.

                        Accessing and using the Website implies that the User has read and accepts to be bound by these Terms without exception. In case the User does not accept the Terms or have any objection to any part of the present Terms, the User must not use the Website.

                        The Company may modify the Terms at any time and thus we recommend that the Terms are reviewed on a regular basis by the User. The date at the beginning of these Terms refers
                        to the latest update of these Terms, which will be applicable from the date of publication.

                        Some Services provided through the Website may be subject to specific conditions or instructions that must be accepted by the User prior to the provision of the relevant Service. These specific conditions may be imposed by the Company or by third parties. Such specific conditions shall apply in addition to the Terms and, in case of conflict, shall supersede the Terms. Accordingly, the User must read and accept such specific conditions before the
                        provision of the relevant Service.

                        Likewise, in respect of collection and processing of personal data, the Privacy Policy will apply.
                    </p>
                </div>
            </div>
            <div className=" absolute bottom-5 right-5 px-3 flex w-[40%] align-middle justify-between">
                <span className='w-[50px] cursor-pointer  shadow-xl h-[50px] flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                    <span className='flex align-middle justify-center'>   <Image
                        src={require(`../../../../assets/icons/file.svg`)}
                        alt="upload image"
                        width={20}
                        height={20}
                        priority
                    /></span>
                </span>
                <span className='w-[50px] h-[50px] shadow-xl cursor-pointer flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                    <span className='flex align-middle justify-center'>   <Image
                        src={require(`../../../../assets/icons/file.svg`)}
                        alt="upload image"
                        width={20}
                        height={20}
                        priority
                    /></span>
                </span>
                <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                    <span className='flex align-middle justify-center'>   <Image
                        src={require(`../../../../assets/icons/file.svg`)}
                        alt="upload image"
                        width={20}
                        height={20}
                        priority
                    /></span>
                </span>
                <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                    <span className='flex align-middle justify-center'>   <Image
                        src={require(`../../../../assets/icons/file.svg`)}
                        alt="upload image"
                        width={20}
                        height={20}
                        priority
                    /></span>
                </span>
                <span className='w-[50px] h-[50px] cursor-pointer flex shadow-xl align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                    <span className='flex align-middle justify-center'>   <Image
                        src={require(`../../../../assets/icons/file.svg`)}
                        alt="upload image"
                        width={20}
                        height={20}
                        priority
                    /></span>
                </span>
                <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                    <span className='flex align-middle justify-center'>   <Image
                        src={require(`../../../../assets/icons/file.svg`)}
                        alt="upload image"
                        width={20}
                        height={20}
                        priority
                    /></span>
                </span>
            </div>
        </div>
    )
}
