import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import * as router from './routes';

function App() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<router.Home />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
