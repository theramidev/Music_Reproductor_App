import React, { FC } from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import { useAppVersion } from '../../hooks/useAppVersion';

export const BannerAd: FC<{}> = () => {
    const { isPremium } = useAppVersion();

    const bannerErrorHandler = (e: any) => {
        console.warn('Error bannerAd: ', e);
    }

    if (isPremium) {
        return null;
    }

    return(
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <AdMobBanner 
                adSize="banner"
                adUnitID="ca-app-pub-2449976564245125/9577646279"
                testDeviceID={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={bannerErrorHandler}
            />
        </View>
    )
}