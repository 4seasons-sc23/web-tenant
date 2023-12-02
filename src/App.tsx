import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'components/organisms/Layout';

import Loader from 'utils/Loader';

import * as router from './routes';

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Layout>
                <Routes>
                    <Route path="/" element={<router.Home />} />

                    <Route path="/signin" element={<router.Signin />} />
                    <Route path="/signup" element={<router.Signup />} />
                    <Route path="/find" element={<router.Find />} />
                    <Route path="/info" element={<router.Info />} />
                    <Route path="/question" element={<router.Question />} />
                    <Route path="/question/post" element={<router.PostQuestion />} />

                    <Route path="/application" element={<router.Application />} />
                    <Route path="/session" element={<router.Session />} />
                    <Route path="/participant" element={<router.Participant />} />
                </Routes>
            </Layout>
        </Suspense>
    );
}

export default App;
