import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const LoadingCard = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ 
      width: '100%', 
      justifyContent: 'center',
      alignItems: 'center', 
      }}>
      <ContentLoader
        speed={1.2}
        width={width - 20}
        height={20}
        viewBox={`0 0 ${width + 100} 10`}
        backgroundColor="#f0f0f0"
        foregroundColor="#e0e0e0"
      >
        <Rect x="0" y="0" rx="5" ry="5" width="100%" height="15" />
      </ContentLoader>
    </View>
  );
};

export default LoadingCard;
