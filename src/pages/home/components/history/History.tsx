import React, { useEffect, useState } from 'react';
import HistroyContent from './HistoryContent';
import TranslatorService from '@/services/Translator.service';
import { useDispatch } from 'react-redux';
import {fetchData} from '@/hooks/FetchHistory'
import { setBookmark } from '@/redux/reducer/translateSlice';


function Histroy() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  return (
    <div className="h-[100%] w-[100%] px-10">
      <HistroyContent  />
    </div>
  );
}

export default Histroy;