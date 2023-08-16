import React from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';
import NoHistory from './NoHistory';

function HistoryContent({ data }) {
  // console.log(JSON.parse(data[0].summaryArray)
  //   , "item we are using now")

  return (
    <>
      {data.length > 0 ? (
        <>
          {data?.map(item => {
            const summaries: any = JSON.parse(item.summaryArray);

            // Parse the JSON string
            return (
              <div key={item.uuid} className='"bg-sirp-listBg border h-[100%] w-[100%] my-2 md:mx-2 mx-2 pt-5 rounded-[1rem]'>
                <ListItem
                  uuid={item.uuid}
                  title={item.title} // Pass the title
                  summary={summaries} // Pass the summary
                  time={item.createdAt}
                  isArchived={item.isArchived} // Pass the isArchived value
                  buttonType="action"
                  actionButtons={<DeleteIcon doc={item.title} />}
                />
              </div>
            );
          })}
        </>
      ) : (
        <>
        <NoHistory/>
        </>
      )}
    </>
  );
}

export default HistoryContent;