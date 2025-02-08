
import { Routes, Route } from 'react-router';
import MyRSS from '../pages/MyRSS';
import AddRSSLinks from '../pages/AddRSSLinks';

function Router() {
    return (

        <Routes>
            <Route path="/" element={<MyRSS />} />
            <Route path="/addRssLinks" element={<AddRSSLinks />} />
        </Routes>

    )
}

export default Router