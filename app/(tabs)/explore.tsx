import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    key: '1',
    title: 'Welcome to the App',
    description: 'Discover the features and enjoy the experience.',
  },
  {
    key: '2',
    title: 'Easy Navigation',
    description: 'Navigate seamlessly through the app with the tab bar.',
  },
  {
    key: '3',
    title: 'Cross Platform',
    description: 'Works perfectly on Android, iOS, and Web.',
  },
  {
    key: '4',
    title: 'Customizable Themes',
    description: 'Switch between light and dark modes anytime.',
  },
];

export default function TabTwoScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => (
    <View style={[styles.slide, { width }]}>
      <ThemedText type="title" style={styles.slideTitle}>
        {item.title}
      </ThemedText>
      <ThemedText style={styles.slideDescription}>{item.description}</ThemedText>
    </View>
  );

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: 'green', dark: 'red' }}>
      <ThemedView style={styles.carouselContainer}>
        <FlatList
          data={onboardingData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
        <View style={styles.pagination}>
          {onboardingData.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotScale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.4, 1],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i.toString()}
                style={[styles.dot, { opacity: dotOpacity, transform: [{ scale: dotScale }] }]}
              />
            );
          })}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 250, // adjust height as needed
  },
  slideTitle: {
    marginBottom: 10,
    textAlign: 'center',
  },
  slideDescription: {
    textAlign: 'center',
    fontSize: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#595959',
    marginHorizontal: 6,
  },
});
