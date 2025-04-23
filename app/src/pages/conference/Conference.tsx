import { Route, Routes } from 'react-router-dom';
import { AddSession } from './sessions/AddSession';
import { Sessions } from './sessions/Sessions';
import { Session } from './sessions/Session';
import './style-sessions.css';
import { Speakers, Speaker } from './Speakers';
import { AboutUs } from './AboutUs';
import { Navigation } from './Navigation';
import ErrorBoundary from './ErrorBoundary';

export function Conference() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={`sessions/new`} element={<AddSession />} />

        <Route path={`sessions/:session_id`} element={<Session />} />

        <Route path={`speakers/:speaker_id`} element={<Speaker />} />

        <Route path={`speakers`} element={<Speakers />} />

        <Route path={`sessions`} element={<Sessions />} />

        <Route path={`about`} element={<AboutUs />} />

        <Route path={`/`} element={<Navigation />} />
      </Routes>
    </ErrorBoundary>
  );
}
