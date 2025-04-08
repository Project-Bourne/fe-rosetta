import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBookmark } from '@/redux/reducer/translateSlice';
import TranslatorService from '@/services/Translator.service';
import Table from '@/components/shared/Table/Table';
import NotificationService from '@/services/notification.service';
import { dummyData } from '@/components/shared/Table/DummyData';
import NoHistory from '../history/NoHistory';
import DeleteIcon from './deleteIcon';

/**
 * BookmarkContent component displays a table of bookmarked translations
 * @returns {JSX.Element} The rendered bookmark content
 */
function BookmarkContent() {
    const { bookmark } = useSelector((state: any) => state.translate);
    const dispatch = useDispatch();

    /**
     * Handles bookmark action for a translation
     * @param {string} uuid - The UUID of the translation to bookmark/unbookmark
     */
    const handleBookmark = async (uuid: string) => {
        try {
            await TranslatorService.bookMarkTranslation(uuid);
            const data = await TranslatorService.getTranslationsHistory();
            dispatch(setBookmark(data?.data));
        } catch (error) {
            NotificationService.error({
                message: "Failed to update bookmark",
                position: "bottom-right"
            });
        }
    };

    /**
     * Handles delete action for a translation
     * @param {string} uuid - The UUID of the translation to delete
     */
    const handleDelete = async (uuid: string) => {
        try {
            await TranslatorService.deleteTranslation(uuid);
            const data = await TranslatorService.getTranslationsHistory();
            dispatch(setBookmark(data?.data));
            NotificationService.success({
                message: "Bookmark Deleted!",
                position: "bottom-right"
            });
        } catch (error) {
            NotificationService.error({
                message: "Failed to delete bookmark",
                position: "bottom-right"
            });
        }
    };

    return (
        // <div>
        //     {bookmark?.length > 0 ? (
        //         <>
        //             {bookmark?.map(item => {
        //                 return (
        //                     <div key={item.translationUuid} className='"bg-sirp-listBg border h-[100%] w-[100%] md:mx-2 mx-2 my-1 rounded-[1rem]'>
        //                         <BookmarkListItem
        //                             uuid={item.translationUuid}
        //                             translateid={item.uuid}
        //                             title={item.translate.title} // Pass the title
        //                             translation={item.translate.textTranslation} // Pass the summary
        //                             time={item.createdAt}
        //                             isArchived={item.bookmark} // Pass the isArchived value
        //                             buttonType="action"
        //                             actionButtons={<DeleteIcon doc={item.title} />}
        //                         />
        //                     </div>
        //                 );
        //             })}
        //         </>
        //     ) : (
        //         <>
        //             <NoHistory />
        //         </>
        //     )}
        <div className="w-full">
            <Table
                data={bookmark || []}
                totalItems={bookmark?.length || 0}
                page={0}
                // rowsPerPage={bookmark?.length || 10}
                onBookmark={handleBookmark}
                onDelete={handleDelete}
                onPageChange={() => {}}
                // onRowsPerPageChange={() => {}}
            />
        </div>
    );
}

export default BookmarkContent;