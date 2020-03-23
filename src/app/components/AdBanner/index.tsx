import React, { FC } from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'react-native-admob';

export const AdBanner: FC<{}> = () => {

    const bannerErrorHandler = (e: any) => {
        console.warn('Error bannerAd: ', e);
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
                adSize="fullBanner"
                adUnitID="ca-app-pub-2449976564245125/9577646279"
                // testDeviceID={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={bannerErrorHandler}
            />
        </View>
    )
}