import HomeLayout from '@/layout/HomeLayout'
import FileUpload from './components/FileUpload';
import BasicTabs from './components/history/tab';


function Home() {
  const showTitle = false;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className='pb-5'>
      <h1 className="text-2xl pl-10 font-bold">Add Content</h1>
      <FileUpload />
      <BasicTabs />
    </div>

  )
}

export default Home;