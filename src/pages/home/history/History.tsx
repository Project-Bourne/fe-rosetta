import React, { useEffect, useState } from 'react';
import HistroyContent from './HistoryContent';
import TranslatorService from '@/services/Translator.service';
import { useDispatch } from 'react-redux';
import { setHistory } from '@/redux/reducer/translateSlice';

interface SummaryData {
  createdAt: any; // Assuming createdAt is of type string
  // Add other properties if necessary
}

function Histroy() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const translatorService = new TranslatorService();
    translatorService.getTranslations()
    .then((res) => {
      const sortedData = res.data.sort((a: SummaryData, b: SummaryData) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
     
      });
      setData(sortedData);
      dispatch(setHistory(sortedData));
    })
    .catch((err) => {
      console.log(err);
    });
  },);

  // console.log(data, 'data');

  return (
    <div className="h-[100%] w-[100%]">
      <HistroyContent data={data} />
    </div>
  );
}

export default Histroy;