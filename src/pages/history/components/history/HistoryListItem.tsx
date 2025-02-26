import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTruncate } from '@/components/custom-hooks';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { fetchData } from '@/hooks/FetchHistory'
import TranslatorService from '@/services/Translator.service';
import NotificationService from '@/services/notification.service';
import { Tooltip } from '@mui/material';
import ReactMarkdown from 'react-markdown';

function ListItem({
    uuid,
    title,
    translation,
    translateid,
    time,
    actionButtons,
    isArchived
}) {
    const [showaction, setShowAction] = useState(0);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleHover = () => {
        setShowAction(1);
    };

    const handleHoverOut = () => {
        setShowAction(0);
    };

    const handleItemClick = () => {
        router.replace(`/history/${uuid}`);
    };

    const handleArchive = async (e, uuid) => {
        e.stopPropagation();
        try {
            await TranslatorService.bookMarkTranslation(uuid)
            fetchData(dispatch)
        }
        catch (error) {
            // console.log(error)
        }
    };

    const handleDelete = async (e, uuid) => {
        e.stopPropagation();
        try {
            await TranslatorService.deleteTranslation(uuid)
            await TranslatorService.getTranslationsHistory()
            fetchData(dispatch)
            NotificationService.success({
                message: "History Deleted!",
                position: "bottom-right"

            });
        } catch (error) {
            // console.log(error)
        }

    };

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
    const parsedDate = DateTime.fromISO(time, { zone: userTimeZone }); // Convert UTC date to user's local time zone
    const formattedDate = parsedDate.toFormat('yyyy-MM-dd HH:mm'); // Format the parsed date

    return (
        <div
            onClick={handleItemClick}
            onMouseOut={handleHoverOut}
            onMouseOver={handleHover}
            className={
                'text-[14px] flex items-center text-gray-500 hover:text-gray-400 hover:bg-sirp-primaryLess2 p-2 cursor-pointer rounded-lg hover:rounded-none hover:shadow justify-between'
            }
        >
            <div className="flex gap-3 items-center  hover:text-gray-400">
                {/* Save icon */}
                <Tooltip title={isArchived ? "Remove from bookmark" : "Save to bookmark"}>
                    <Image
                        src={
                            isArchived
                                ? require(`../../../../assets/icons/on.saved.svg`)
                                : require(`../../../../assets/icons/saved.svg`)
                        }
                        alt="documents"
                        className="cursor-pointer w-4 h-4"
                        width={10}
                        height={10}
                        onClick={(e) => handleArchive(e, translateid)}
                    />
                </Tooltip>
                {/* name */}
                {/* <p className="text-sirp-black-500 ml-2 md:w-[20rem] hover:text-gray-500">
                    {useTruncate(title, 20)}
                </p> */}
                <ReactMarkdown
                    components={{
                        a: ({ node, ...props }) => (
                            <a {...props} className="text-blue-500 hover:text-blue-700">
                                {props.children} <br /> <br />
                            </a>
                        ),
                        b: ({ node, ...props }) => (
                            <b {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </b>
                        ),
                        p: ({ node, ...props }) => (
                            <p {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </p>
                        ),
                        h1: ({ node, ...props }) => (
                            <h1 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h1>
                        ),
                        h2: ({ node, ...props }) => (
                            <h2 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h2>
                        ),
                        h3: ({ node, ...props }) => (
                            <h3 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h3>
                        ),
                        h4: ({ node, ...props }) => (
                            <h4 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h4>
                        ),
                        h5: ({ node, ...props }) => (
                            <h5 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h5>
                        ),
                        h6: ({ node, ...props }) => (
                            <h6 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h6>
                        )
                    }}
                >
                    {useTruncate(title, 20)}
                </ReactMarkdown>
            </div>
            {showaction === 0 ? (
                // <div className="md:w-[23rem] hidden md:block">
                //     <p className="text-gray-400 border-l-2 pl-2 ">{useTruncate(translation, 20)}</p>
                // </div>
                <ReactMarkdown
                    components={{
                        a: ({ node, ...props }) => (
                            <a {...props} className="text-blue-500 hover:text-blue-700">
                                {props.children} <br /> <br />
                            </a>
                        ),
                        b: ({ node, ...props }) => (
                            <b {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </b>
                        ),
                        p: ({ node, ...props }) => (
                            <p {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </p>
                        ),
                        h1: ({ node, ...props }) => (
                            <h1 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h1>
                        ),
                        h2: ({ node, ...props }) => (
                            <h2 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h2>
                        ),
                        h3: ({ node, ...props }) => (
                            <h3 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h3>
                        ),
                        h4: ({ node, ...props }) => (
                            <h4 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h4>
                        ),
                        h5: ({ node, ...props }) => (
                            <h5 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h5>
                        ),
                        h6: ({ node, ...props }) => (
                            <h6 {...props} className="text-gray-500 hover:text-gray-400">
                                {props.children} <br /> <br />
                            </h6>
                        )
                    }}
                >
                    {useTruncate(translation, 20)}
                </ReactMarkdown>
            ) : null}
            {/* time */}
            <div className="flex w-[8rem] mr-[3rem] md:mr-[5rem]">
                <p>{formattedDate}</p>
            </div>
            {/* overflow buttons */}
            {showaction === 1 && (
                <div className="border-l-2" onClick={(e) => handleDelete(e, translateid)}>
                    {actionButtons}
                </div>
            )}
        </div>
    );
}

export default ListItem;