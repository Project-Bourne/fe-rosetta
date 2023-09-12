import React, { useEffect } from 'react';
import BookmarkContent from './BookmarkContent';
import { useDispatch, useSelector } from 'react-redux';
import { setBookmark } from '@/redux/reducer/translateSlice';
import {fetchData} from '@/hooks/FetchHistory'

function Bookmark() {
  const { history } = useSelector((state:any) => state?.translate)
  const dispatch = useDispatch();
   
  useEffect(() => {
    // fetchData(dispatch)
    dispatch(setBookmark(history));
  }, [history]);


  return (
    <div className="h-[100%] w-[100%] px-10">
      <BookmarkContent />
    </div>
  );
}

export default Bookmark;