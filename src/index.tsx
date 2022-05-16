import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import { WrappedApp as App } from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const root: HTMLElement | null = document.getElementById('root');

  ReactDOM.render(<App />, root);
});
