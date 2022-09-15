import HoaxSubmit from '../components/HoaxSubmit';
import UserList from '../components/UserList';
import { useSelector } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';

const HomePage = () => {
    const { isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn }));

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md'>
                    {isLoggedIn &&
                        <div className="mb-2">
                            <HoaxSubmit />
                        </div>
                    }
                    <HoaxFeed />
                </div>
                <div className='col-md'>
                    <UserList />
                </div>
            </div>

        </div>
    );
};

export default HomePage;