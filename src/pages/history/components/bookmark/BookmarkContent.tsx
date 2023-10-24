import React from 'react';
import DeleteIcon from './deleteIcon';
import { useSelector } from 'react-redux';
import BookmarkListItem from './BookmarkListItem';
import NoHistory from './NoHistory';

function BookmarkContent() {

    const { bookmark } = useSelector((state: any) => state.translate)
    return (
        <div>
            {bookmark?.length > 0 ? (
                <>
                    {bookmark?.map(item => {
                        return (
                            <div key={item.translationUuid} className='"bg-sirp-listBg border h-[100%] w-[100%] md:mx-2 mx-2 my-1 rounded-[1rem]'>
                                <BookmarkListItem
                                    uuid={item.translationUuid}
                                    translateid={item.uuid}
                                    title={item.translate.title} // Pass the title
                                    translation={item.translate.textTranslation} // Pass the summary
                                    time={item.createdAt}
                                    isArchived={item.bookmark} // Pass the isArchived value
                                    buttonType="action"
                                    actionButtons={<DeleteIcon doc={item.title} />}
                                />
                            </div>
                        );
                    })}
                </>
            ) : (
                <>
                    <NoHistory />
                </>
            )}
        </div>
    );
}

export default BookmarkContent;