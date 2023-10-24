import React, { useEffect, useState } from 'react';
import DeleteIcon from './deleteIcon';
import ListItem from './HistoryListItem';
import NoHistory from './NoHistory';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@mui/material';
import { setHistory, updatePagination } from '@/redux/reducer/translateSlice';
import TranslatorService from '@/services/Translator.service';
import CircularProgress from '@mui/material/CircularProgress';

function HistoryContent() {
    const { history } = useSelector((state: any) => state.translate);
    const itemsPerPage = history?.itemsPerPage || 10;
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(history?.currentPage || 1);
    const dispatch = useDispatch()
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // let displayedHistory = history.translate?.slice(startIndex, endIndex);
    const handlePageChange = async (event, page) => {
        setLoading(true)
        try {
            setCurrentPage(page);
            dispatch(updatePagination({ currentPage: page }));
            const data =    await  TranslatorService.getTranslationsHistory(page)
            // console.log(data, displayedHistory)
            dispatch(setHistory(data?.data))
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    };

    return (
        <div>
            {loading && 
            <div className='fixed top-0 bottom-0 right-0 left-0  z-[1000000] flex items-center justify-center backdrop-blur-sm  bg-[#747474]/[0.1] backdrop-brightness-50'> 
                <CircularProgress/>
            </div>}
            {history?.translate?.length > 0 ? (
                <>
                    {history?.translate.map((item) => {
                        return (
                            <div
                                key={item.translationUuid}
                                className='bg-sirp-listBg border h-[100%] w-[100%] md:mx-2 mx-2 my-1 rounded-[1rem]'
                            >
                                <ListItem
                                    uuid={item.translationUuid}
                                    translateid={item.uuid}
                                    title={item.translate.title} // Pass the title
                                    translation={item.translate.textTranslation} // Pass the summary
                                    time={item.createdAt}
                                    isArchived={item.bookmark}
                                    actionButtons={<DeleteIcon doc={item.title} />}
                                />
                            </div>
                        );
                    })}
                    <div className='w-full m-5 flex justify-end items-center'>
                        <Pagination
                            count={Math.ceil(history.totalItems / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant='outlined'
                            color='primary'
                        />
                    </div>
                </>
            ) : (
                <>
                    <NoHistory />
                </>
            )}
        </div>
    );
}

export default HistoryContent;
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}

