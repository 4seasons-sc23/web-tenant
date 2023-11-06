import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'utils/Loader';

import * as router from './routes';

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<router.Home />} />

                <Route path="/signin" element={<router.Signin />} />
                <Route path="/signup" element={<router.Signup />} />
                <Route path="/find" element={<router.Find />} />
            </Routes>
        </Suspense>
    );
}

export default App;
