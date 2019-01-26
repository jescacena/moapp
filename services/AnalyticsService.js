import { Analytics, PageHit, Event } from 'expo-analytics';

const analytics = new Analytics('UA-44651404-5');

export const gaScreenView = (screenKey) => {
    // analytics.hit(new PageHit('Splash'))
    analytics.event(new Event('screen', screenKey))
        .then(() => console.log(`GA Screen View:${screenKey}`))
        .catch(e => console.log(e.message));
};

export const gaScreenEvent = (eventKey, data) => {
    analytics.event(new Event('event', eventKey, data))
        .then(() => console.log(`GA Event:${eventKey}: ${data}`))
        .catch(e => console.log(e.message));
};
