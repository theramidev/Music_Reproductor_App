import React, {FC} from 'react';
import {View, SafeAreaView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const LoadingComponent: FC<any> = () => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection: 'row',
        width: '100%',
      }}>
      <SafeAreaView>
        <SkeletonPlaceholder highlightColor="#838383">
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginLeft: 10,
              }}
            />
          </View>
        </SkeletonPlaceholder>
      </SafeAreaView>

      <SafeAreaView style={{width: '70%'}}>
        <SkeletonPlaceholder highlightColor="#838383">
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '100%',
              height: 20,
              marginLeft: 10,
              borderRadius: 2,
            }}
          />

          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '40%',
              height: 10,
              marginTop: 5,
              marginLeft: 10,
              borderRadius: 2,
            }}
          />
        </SkeletonPlaceholder>
      </SafeAreaView>
    </View>
  );
};
