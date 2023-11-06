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
            </Routes>
        </Suspense>
    );
}

export default App;
