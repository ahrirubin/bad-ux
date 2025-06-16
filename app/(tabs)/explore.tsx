import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    key: '1',
    title: 'Welcome to the recipebook.',
    description: 'Here are some totally accurate recipes to get you started!',
  },
  {
    key: '2',
    title: 'Spaghetti bolognese',
    description: `Ingredients:

Spaghetti (200g)
Eggs (2 large)
Pancetta or guanciale (100g, diced)
Parmesan or Pecorino cheese (50g, grated)
Black pepper
Salt

Instructions:

Cook spaghetti in salted boiling water until al dente.
In a pan, cook pancetta until crispy.
Beat eggs with grated cheese and a good pinch of black pepper.
Drain pasta, reserving some cooking water.
Toss hot pasta with pancetta, then quickly mix in egg mixture off the heat, adding pasta water if needed to create a creamy sauce.
Serve immediately with extra cheese and pepper.`,
  },
  {
    key: '3',
    title: 'Steak & eggs',
    description: `Ingredients:

Cooked rice (2 cups, preferably chilled)
Eggs (2)
Vegetables (like peas, carrots, chopped) – ½ cup
Soy sauce (2 tbsp)
Green onions (2, chopped)
Garlic (1 clove, minced)
Cooking oil (2 tbsp)
Salt and pepper

Instructions:

Heat oil in a pan or wok. Scramble eggs and set aside.
Sauté garlic and vegetables until tender.
Add cooked rice, stir-fry breaking up clumps.
Mix in soy sauce, scrambled eggs, and green onions.
Season with salt and pepper to taste.
Stir well and serve hot.`,
  },
  {
    key: '4',
    title: 'Ramen',
    description: `Ingredients:

Eggs (4)
Tomatoes (4 large, chopped) or 1 can crushed tomatoes
Onion (1, chopped)
Bell pepper (1, chopped)
Garlic (2 cloves, minced)
Paprika (1 tsp)
Cumin (1 tsp)
Chili powder or cayenne (optional, ¼ tsp)
Olive oil (2 tbsp)
Salt and pepper
Fresh parsley or cilantro for garnish

Instructions:

Heat olive oil in a pan. Sauté onion and bell pepper until soft.
Add garlic, paprika, cumin, and chili powder; cook 1 min.
Stir in tomatoes, simmer until thickened (10–15 min).
Make small wells in the sauce, crack eggs into them. Cover and cook until eggs set (5–8 min).
Season with salt and pepper, garnish with herbs.
Serve with crusty bread.`,
  },
];

// Helper to split recipe into formatted JSX
function formatDescription(text: string) {
  const [ingredientsBlock, instructionsBlock] = text.split(/Instructions:\n?/);

  const ingredients = ingredientsBlock
    .replace('Ingredients:\n', '')
    .split('\n')
    .filter(Boolean);

  const instructions = instructionsBlock
    .split('\n')
    .filter(Boolean);

  return (
    <View>
      <ThemedText style={styles.sectionHeader}>Ingredients:</ThemedText>
      {ingredients.map((item, index) => (
        <View key={index} style={styles.bulletItem}>
          <ThemedText style={styles.bulletPoint}>•</ThemedText>
          <ThemedText style={styles.bulletText}>{item}</ThemedText>
        </View>
      ))}

      <View style={styles.sectionGap} />

      <ThemedText style={styles.sectionHeader}>Instructions:</ThemedText>
      {instructions.map((step, index) => (
        <ThemedText key={index} style={styles.instructionText}>
          {step}
        </ThemedText>
      ))}
    </View>
  );
}

export default function TabTwoScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Animation for flashing background on carousel container
  const flashAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(flashAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [flashAnim]);

  const backgroundColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#39FF14', '#FF00FF'], // neon lime to neon magenta
  });

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => {
    const isFirst = item.key === '1';

    return (
      <View
        style={[
          styles.slide,
          isFirst ? styles.centeredSlide : styles.scrollableSlide,
          { width },
        ]}
      >
        <ThemedText type="title" style={styles.slideTitle}>
          {item.title}
        </ThemedText>

        {isFirst ? (
          <ThemedText style={styles.slideDescription}>{item.description}</ThemedText>
        ) : (
          <ScrollView
            style={styles.scrollDescription}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.textContainer}>
              {formatDescription(item.description)}
            </View>
          </ScrollView>
        )}
      </View>
    );
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: 'green', dark: 'red' }}>
      {/* Animated container with flashing neon background */}
      <Animated.View style={[styles.carouselContainer, { backgroundColor }]}>
        <FlatList
          data={onboardingData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
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
                style={[
                  styles.dot,
                  { opacity: dotOpacity, transform: [{ scale: dotScale }] },
                ]}
              />
            );
          })}
        </View>
      </Animated.View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
    flex: 1,
  },
  slide: {
    paddingHorizontal: 20,
    flex: 1,
  },
  centeredSlide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollableSlide: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  slideTitle: {
    marginBottom: 10,
    color: 'red',
    backgroundColor: 'black',
    fontFamily: 'Papyrus',
    textAlign: 'right',
    letterSpacing: -6,
  },
  scrollDescription: {
    maxHeight: 400,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  slideDescription: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Comic Sans MS',
    color: 'yellow',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingLeft: 12,
  },
  bulletPoint: {
    marginRight: 6,
    lineHeight: 22,
    fontSize: 16,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 6,
    textAlign: 'left',
  },
  sectionGap: {
    height: 16,
  },
  textContainer: {
    backgroundColor: '#fff9c4',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
