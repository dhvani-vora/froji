// app/index.tsx

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodCard from '../components/FoodCard';
import FridgeStatusCard from '../components/FridgeStatusCard';
import WasteSavingsCard from '../components/WasteSavingsCard';

const COLORS = {
  background: '#FAEFED',
  cardPink: '#FFD4D1',
  coral: '#E37C78',
  softTeal: '#82BAC4',
  text: '#006078',
  white: '#FFFFFF',
};

type Urgency = 'high' | 'medium' | 'low';

type FoodItem = {
  id: string;
  emoji: string;
  name: string;
  expiresText: string;
  urgency: Urgency;
};

const PLACEHOLDER_FOOD: FoodItem[] = [
  { id: '1', emoji: '🍓', name: 'strawberries', expiresText: 'expires tomorrow', urgency: 'high' },
  { id: '2', emoji: '🥛', name: 'milk', expiresText: '2 days left', urgency: 'medium' },
  { id: '3', emoji: '🥬', name: 'lettuce', expiresText: '4 days left', urgency: 'low' },
];

// Visual-only for now — Day 3 wires this up to real navigation.
type NavTab = {
  key: string;
  emoji: string;
  label: string;
};

const NAV_TABS: NavTab[] = [
  { key: 'home', emoji: '🏠', label: 'home' },
  { key: 'add', emoji: '➕', label: 'add' },
  { key: 'stats', emoji: '📊', label: 'stats' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.decorCircleOne} />
      <View style={styles.decorCircleTwo} />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header */}
        <View style={styles.brandRow}>
          <View>
            <Text style={styles.brandName}>froji 🥕</Text>
            <Text style={styles.brandTagline}>your fridge's little sidekick</Text>
          </View>
          <View style={styles.mascotChip}>
            <Text style={styles.mascotEmoji}>🧊</Text>
          </View>
        </View>

        {/* 2. Greeting */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>hey bestie, what's in the fridge?</Text>
          <Text style={styles.heroSubtitle}>
            keep tabs on your food before it gets forgotten.
          </Text>
        </View>

        {/* 3. Fridge status */}
        <View style={styles.statusSection}>
          <FridgeStatusCard status="looking fresh ✨" itemCount={8} />
        </View>

        {/* 4. Expiring section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>what's expiring? 👀</Text>

          <View style={styles.cardList}>
            {PLACEHOLDER_FOOD.map((item) => (
              <FoodCard
                key={item.id}
                emoji={item.emoji}
                name={item.name}
                expiresText={item.expiresText}
                urgency={item.urgency}
              />
            ))}
          </View>
        </View>

        {/* 5. Waste savings */}
        <View style={styles.section}>
          <WasteSavingsCard itemsSaved={3} />
        </View>

        {/* 6. Generate a recipe button */}
        <Pressable
          style={({ pressed }) => [
            styles.recipeButton,
            pressed && styles.recipeButtonPressed,
          ]}
          onPress={() => console.log('Generate a recipe pressed')}
        >
          <Text style={styles.recipeButtonText}>generate a recipe 🍳</Text>
        </Pressable>

        {/* 7. Add food button */}
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={() => console.log('Add Food pressed')}
        >
          <Text style={styles.addButtonText}>+ add food</Text>
        </Pressable>
      </ScrollView>

      {/* 8. Bottom nav placeholder (visual only, no routing) */}
      <View style={styles.bottomNav}>
        {NAV_TABS.map((tab) => (
          <View key={tab.key} style={styles.navTab}>
            <Text style={styles.navEmoji}>{tab.emoji}</Text>
            <Text style={styles.navLabel}>{tab.label}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 24,
  },

  decorCircleOne: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.cardPink,
    opacity: 0.5,
    top: -40,
    right: -50,
  },
  decorCircleTwo: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.softTeal,
    opacity: 0.25,
    top: 120,
    left: -40,
  },

  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
  },
  brandName: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
  },
  brandTagline: {
    fontSize: 13,
    color: COLORS.text,
    opacity: 0.6,
    marginTop: 2,
  },
  mascotChip: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.text,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  mascotEmoji: {
    fontSize: 22,
  },

  hero: {
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.text,
    opacity: 0.7,
  },

  statusSection: {
    marginBottom: 30,
  },

  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
    textTransform: 'lowercase',
  },
  cardList: {
    gap: 12,
  },

  recipeButton: {
    backgroundColor: COLORS.white,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: COLORS.coral,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  recipeButtonPressed: {
    opacity: 0.8,
  },
  recipeButtonText: {
    color: COLORS.coral,
    fontSize: 15,
    fontWeight: '700',
  },

  addButton: {
    backgroundColor: COLORS.coral,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.coral,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  addButtonPressed: {
    opacity: 0.85,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.text,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  navTab: {
    alignItems: 'center',
    gap: 2,
  },
  navEmoji: {
    fontSize: 18,
  },
  navLabel: {
    fontSize: 11,
    color: COLORS.text,
    opacity: 0.6,
    textTransform: 'lowercase',
  },
});