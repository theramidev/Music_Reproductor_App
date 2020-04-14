import Rate, { AndroidMarket, IConfig } from 'react-native-rate';

export const RateApp = () => {
    const config: IConfig = {
        GooglePackageName:"com.musicdm",
        preferredAndroidMarket: AndroidMarket.Google,

    }
    Rate.rate(config, (success) => {
        if (success) {
            console.log('Rate Success');
        } else {
            console.log('Rate No Success');
        }
    });
}