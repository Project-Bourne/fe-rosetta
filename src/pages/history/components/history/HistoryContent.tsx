import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHistory, updatePagination } from '@/redux/reducer/translateSlice';
import TranslatorService from '@/services/Translator.service';
import Table from '@/components/shared/Table/Table';
import NotificationService from '@/services/notification.service';
import { dummyData } from '@/components/shared/Table/DummyData';

/**
 * HistoryContent component displays a table of translation history
 * @returns {JSX.Element} The rendered history content
 */
function HistoryContent() {
    const { history } = useSelector((state: any) => state.translate);
    // const itemsPerPage = history?.itemsPerPage || 10;
    // const [loading, setLoading] = useState(false)
    // const [currentPage, setCurrentPage] = useState(history?.currentPage || 1);
    // const dispatch = useDispatch()
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // // let displayedHistory = history.translate?.slice(startIndex, endIndex);
    // const handlePageChange = async (event, page) => {
    //     setLoading(true)
    const dispatch = useDispatch();

    // Use dummy data if no real data is available
    const displayData = history?.translate?.length > 0 ? history.translate : dummyData;

    /**
     * Handles bookmark action for a translation
     * @param {string} uuid - The UUID of the translation to bookmark
     */
    const handleBookmark = async (uuid: string) => {
        try {
            await TranslatorService.bookMarkTranslation(uuid);
            const data = await TranslatorService.getTranslationsHistory(history.currentPage);
            dispatch(setHistory(data?.data));
        } catch (error) {
            NotificationService.error({
                message: "Failed to bookmark translation",
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
            const data = await TranslatorService.getTranslationsHistory(history.currentPage);
            dispatch(setHistory(data?.data));
            NotificationService.success({
                message: "History Deleted!",
                position: "bottom-right"
            });
        } catch (error) {
            NotificationService.error({
                message: "Failed to delete translation",
                position: "bottom-right"
            });
        }
    };

    /**
     * Handles page change in the table
     * @param {number} page - The new page number
     */
    const handlePageChange = async (page: number) => {
        try {
            // setCurrentPage(page);
            // dispatch(updatePagination({ currentPage: page }));
            // const data =    await  TranslatorService.getTranslationsHistory(page)
            // // // console.log(data, displayedHistory)
            // dispatch(setHistory(data?.data))
            
            dispatch(updatePagination({ currentPage: page + 1 }));
            const data = await TranslatorService.getTranslationsHistory(page + 1);
            dispatch(setHistory(data?.data));
        } catch (error) {
            NotificationService.error({
                message: "Failed to fetch translations",
                position: "bottom-right"
            });
        }
    };

    return (
        // <div>
        //     {loading && 
        //     <div className='fixed top-0 bottom-0 right-0 left-0  z-[1000000] flex items-center justify-center backdrop-blur-sm  bg-[#747474]/[0.1] backdrop-brightness-50'> 
        //         <CircularProgress/>
        //     </div>}
        //     {history?.translate?.length > 0 ? (
        //         <>
        //             {history?.translate.map((item) => {
        //                 return (
        //                     <div
        //                         key={item.translationUuid}
        //                         className='bg-sirp-listBg border h-[100%] w-[100%] md:mx-2 mx-2 my-1 rounded-[1rem]'
        //                     >
        //                         <ListItem
        //                             uuid={item.translationUuid}
        //                             translateid={item.uuid}
        //                             title={item.translate.title} // Pass the title
        //                             translation={item.translate.textTranslation} // Pass the summary
        //                             time={item.createdAt}
        //                             isArchived={item.bookmark}
        //                             actionButtons={<DeleteIcon doc={item.title} />}
        //                         />
        //                     </div>
        //                 );
        //             })}
        //             <div className='w-full m-5 flex justify-end items-center'>
        //                 <Pagination
        //                     count={Math.ceil(history.totalItems / itemsPerPage)}
        //                     page={currentPage}
        //                     onChange={handlePageChange}
        //                     variant='outlined'
        //                     color='primary'
        //                 />
        //             </div>
        //         </>
        //     ) : (
        //         <>
        //             <NoHistory />
        //         </>
        //     )}
        
        <div className="w-full">
            <Table
                data={displayData}
                totalItems={displayData.length}
                page={history?.currentPage - 1 || 0}
                onBookmark={handleBookmark}
                onDelete={handleDelete}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default HistoryContent;

