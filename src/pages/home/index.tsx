import HomeLayout from '@/layout/HomeLayout'
import FileUpload from './components/FileUpload';
import BasicTabs from './history/tab';


function Home() {
  const showTitle = false;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className='py-5'>
      <FileUpload />
      <BasicTabs />
    </div>

  )
}

export default Home;