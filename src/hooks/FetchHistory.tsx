import { setHistory } from '@/redux/reducer/translateSlice';
import TranslatorService from '@/services/Translator.service';

export async function fetchData(dispatch) {
  try {
    const Data =    await  TranslatorService.getTranslationsHistory()
    // console.log(Data);
    if (Data.status) {
        dispatch(setHistory(Data.data));
    } else {
      // Handle the case where Data.status is falsy
      // console.log("unable to fetch")
    }
  } catch (error) {
    // console.log(error);
  }
}