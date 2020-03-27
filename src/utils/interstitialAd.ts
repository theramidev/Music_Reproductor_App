import { AdMobInterstitial } from 'react-native-admob';

export const isPremium = false;

export const showAd = () => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-2449976564245125/9262979175');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);

    if (!isPremium) {
        AdMobInterstitial.requestAd()
        .then(() => AdMobInterstitial.showAd())
        .catch((e: any) => {
            console.warn('InterstialAd Error: ', e);
        });
    }
}