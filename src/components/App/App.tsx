import React, { FC } from 'react';
import { Suspense } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Provider as AppNameStoreProvider } from 'react-redux'; // rename AppNameStoreProvider in <YourAppName>StoreProvider
// @ts-ignore
import { DateTime } from 'luxon';
import { store } from '@/store';
import '@/assets/styles/index.scss';
import styles from './App.module.scss';

const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' },
};

const App: FC = () => {
  const { t, i18n } = useTranslation();

  const getGreetingTime = (d = DateTime.now()) => {
    const split_afternoon = 12; // 24hr time to split the afternoon
    const split_evening = 17; // 24hr time to split the evening
    const currentHour = parseFloat(d.toFormat('hh'));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      return 'afternoon';
    } else if (currentHour >= split_evening) {
      return 'evening';
    }
    return 'morning';
  };

  return (
    <AppNameStoreProvider store={store}>
      <div className={styles.app}>App</div>
      <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {/*// @ts-ignore*/}
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      <p>
        <Trans i18nKey="description.part1">
          Edit <code>src/App.js</code> and save to reload.
        </Trans>
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        {t('description.part2')}
      </a>
      <div>{t('footer.date', { date: new Date(), context: getGreetingTime() })}</div>
    </AppNameStoreProvider>
  );
};

// here app catches the suspense from page in case translations are not yet loaded
export function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  );
}
