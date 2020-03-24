import { useState, useEffect } from 'react';
import { isPremium as premium } from '../../utils/interstitialAd';

export const useAppVersion = () => {
    const [isPremium] = useState(premium);

    return {isPremium}
}