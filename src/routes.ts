import { lazy } from 'react';

export const Home = lazy(() => import('./pages/Home'));

export const Signin = lazy(() => import('./pages/Signin'));
export const Signup = lazy(() => import('./pages/Signup'));
export const Info = lazy(() => import('./pages/Info'));
export const Find = lazy(() => import('./pages/Find'));
export const Question = lazy(() => import('./pages/Question'));
export const PostQuestion = lazy(() => import('./pages/Question/Post'));
export const QuestionContent = lazy(() => import('./pages/Question/Content'));

export const Application = lazy(() => import('./pages/Application'));
export const Session = lazy(() => import('./pages/Sessions'));
export const Participant = lazy(() => import('./pages/Participant'));
