import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'utils/Loader';

import * as router from './routes';

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<router.Home />} />

                <Route path="/sign" element={<router.Account />} />
            </Routes>
        </Suspense>
    );
}

export default App;
