import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTruncate } from '@/components/custom-hooks';
import Image from 'next/image';
import ListItemModels from '../../../utils/model/home.models';
import { DateTime } from 'luxon';

function ListItem({
  uuid,
  title,
  summary,
  time,
  actionButtons,
  isArchived
}: ListItemModels) {
  const [showaction, setShowAction] = useState(0);
  const router = useRouter();

  const handleHover = () => {
    setShowAction(1);
  };

  const handleHoverOut = () => {
    setShowAction(0);
  };

  const handleItemClick = () => {
    router.push(`/home/${uuid}`);
  };

  const handleArchive = e => {
    e.stopPropagation();
  };

  const handleDelete = e => {
    e.stopPropagation();
    console.log('delete clicked', uuid);
  };

  const firstSummary = summary[0].summary;
  const lastSummary = summary[summary.length - 1].summary;

  const truncatedSummary = useTruncate(lastSummary, 18);
  const truncatedFirstSummary = useTruncate(firstSummary, 50);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
  const parsedDate = DateTime.fromISO(time, { zone: userTimeZone }); // Convert UTC date to user's local time zone
  const formattedDate = parsedDate.toFormat('yyyy-MM-dd HH:mm'); // Format the parsed date

  return (
    <div
      onClick={handleItemClick}
      onMouseOut={handleHoverOut}
      onMouseOver={handleHover}
      className={
        'text-[14px] flex items-center hover:text-gray-400 hover:bg-sirp-primaryLess2 p-2 cursor-pointer rounded-lg hover:rounded-none hover:shadow justify-between'
      }
    >
      <div className="flex gap-3 items-center  hover:text-gray-400">
        {/* Save icon */}
        <Image
          src={
            isArchived
              ? require(`../../../assets/icons/on.saved.svg`)
              : require(`../../../assets/icons/saved.svg`)
          }
          alt="documents"
          className="cursor-pointer w-4 h-4"
          width={10}
          height={10}
          onClick={handleArchive}
        />
        {/* name */}
        <p className="text-sirp-black-500 ml-2 md:w-[12rem] hover:text-gray-400">
          {useTruncate(title, 20)}
        </p>
      </div>
      {/* description */}
      <div className="hover:text-gray-400 hidden md:block">
        <p className="text-black-100 w-[23rem]">{truncatedFirstSummary}</p>
      </div>
      {/* message */}
      {showaction === 0 ? (
        <div className="md:w-[15%] hidden md:block">
          <p className="text-gray-400 border-l-2 pl-2 ">{truncatedSummary}</p>
        </div>
      ) : null}
      {/* time */}
      <div className="flex w-[8rem] mr-[3rem] md:mr-[5rem]">
        <p>{formattedDate}</p>
      </div>
      {/* overflow buttons */}
      {showaction === 1 && (
        <div className="border-l-2" onClick={handleDelete}>
          {actionButtons}
        </div>
      )}
    </div>
  );
}

export default ListItem;