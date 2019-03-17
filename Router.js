import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Platform, StatusBar } from 'react-native';
import Splash from './components/Splash';
import AgesList from './components/AgesList';
import CharactersList from './components/CharactersList';
import CharacterDetail from './components/CharacterDetail';
import PrivacyPolicy from './components/PrivacyPolicy';

const RouterComponent = () => {
    const characterExample = {
        name: 'Ka-Zar (David Rand)',
        description: '<p>American <strong>John Rand</strong>&rsquo;s plane crashes in the Congo jungle with <strong>his wife Constance</strong> and very <strong>young son David</strong> on board. After some time lost in the jungle, Constance dies of a jungle malady. Zar, the lion who witnessed everything, keeps an eye on them.</p><p>Two weeks later, when his son becomes sick, John decides to march out of the jungle, but a storm causes a large tree to fall on him. He recovers physically but mentally lives in a delusional world, believing that the jungle is his home.The boy recovers and grows up and at eight is a husky lad.</p><p><strong>David Rand</strong> continues to grow and meets the jungle animals, keeping his distance from the natives he met.The natives work for a greedy and vicious fat man named <strong>Paul de Kraft</strong>, who is after emeralds. David, now a strong young man, has been away from camp and returns to see his father dying, their hut in flames and de Kraft present there for everything.</p><p><strong>Zar the lion</strong> saves David from de Kraft. His father dies and David now thinks of himself as <strong>Ka-Zar</strong>, brother of Zar.</p><p>The rest of the story is about how he tracks down de Kraft and, with Zar&rsquo;s help, finally kills him. Like in the Tarzan stories, the creatures of the jungle all have names. Ka-Zar has a rudimentary education and talks accordingly.</p>',
        yearDebuted: '1936 (October)',
        creators: 'Bob Byrd',
        firstAppearance: 'Ka-Zar #1',
        firstAppearanceUrl: 'https://en.wikipedia.org/wiki/Ka-Zar_(magazine)',
        img: 'https://i.annihil.us/u/prod/marvel/i/mg/9/40/4dcc503738d3d.jpg'
    };
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="splash" component={Splash} initial style={{ paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight }} />
                <Scene key="main" style={{ paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight }}>
                    <Scene key="listAges" component={AgesList} hideNavBar />
                    <Scene key="listCharacters" component={CharactersList} title="Characters List" hideNavBar />
                    <Scene key="characterDetail" component={CharacterDetail} hideNavBar />
                    <Scene key="privacyPolicy" component={PrivacyPolicy} hideNavBar />
                </Scene>
            </Scene>
        </Router>
    );
};


export default RouterComponent;