import MessageContainer from '../components/MessageContainer';
import Sidebar from '../components/Sidebar';

function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-contrast-200 bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default Home;
