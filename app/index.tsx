// app/index.tsx

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// NEW: useRouter lets us navigate programmatically, usePathname tells us
// which route is currently active so we can highlight the right tab.
import { usePathname, useRouter } from 'expo-router';
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

// Each tab now carries a real route, matching the file names in app/.
type NavTab = {
  key: string;
  emoji: string;
  label: string;
  route: '/' | '/my-fridge' | '/pantry' | '/profile';
};

const NAV_TABS: NavTab[] = [
  { key: 'home', emoji: '🏠', label: 'home', route: '/' },
  { key: 'fridge', emoji: '🧊', label: 'my fridge', route: '/my-fridge' },
  { key: 'pantry', emoji: '🥫', label: 'pantry', route: '/pantry' },
  { key: 'profile', emoji: '👤', label: 'profile', route: '/profile' },
];

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname(); // e.g. "/", "/my-fridge", "/pantry", "/profile"

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.decorCircleOne} />
      <View style={styles.decorCircleTwo} />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.brandRow}>
          <View>
            <Text style={styles.brandName}>froji 🥕</Text>
            <Text style={styles.brandTagline}>your fridge's little sidekick</Text>
          </View>
          <View style={styles.mascotChip}>
            <Text style={styles.mascotEmoji}>🧊</Text>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>hey bestie, what's in the fridge?</Text>
          <Text style={styles.heroSubtitle}>
            keep tabs on your food before it gets forgotten.
          </Text>
        </View>

        {/* Fridge status */}
        <View style={styles.statusSection}>
          <FridgeStatusCard status="looking fresh ✨" itemCount={8} />
        </View>

        {/* Expiring section */}
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

        {/* Waste savings */}
        <View style={styles.section}>
          <WasteSavingsCard itemsSaved={3} />
        </View>

        {/* Generate a recipe */}
        <Pressable
          style={({ pressed }) => [
            styles.recipeButton,
            pressed && styles.recipeButtonPressed,
          ]}
          onPress={() => console.log('Generate a recipe pressed')}
        >
          <Text style={styles.recipeButtonText}>generate a recipe 🍳</Text>
        </Pressable>

        {/* Add food */}
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

      {/* Bottom nav — now wired to real Expo Router navigation */}
      <View style={styles.bottomNav}>
        {NAV_TABS.map((tab) => {
          const isActive = pathname === tab.route;
          return (
            // Pressable + router.push() is how we navigate on tap.
            // (Wrapping the whole tab, not just the icon, for a bigger tap target.)
            <Pressable
              key={tab.key}
              style={styles.navTab}
              onPress={() => router.push(tab.route)}
            >
              <View style={[styles.navIconWrap, isActive && styles.navIconWrapActive]}>
                <Text style={styles.navEmoji}>{tab.emoji}</Text>
              </View>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
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
    paddingBottom: 100,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: COLORS.text,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  navTab: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,   // NEW: slightly bigger tap area now it's a Pressable
    paddingHorizontal: 6,
  },
  navIconWrap: {
    width: 38,             // was 34 — a bit bigger to match the bigger emoji
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  navIconWrapActive: {
    backgroundColor: COLORS.cardPink,
  },
  navEmoji: {
    fontSize: 20,           // was 17 — bigger, easier to see
  },
  navLabel: {
    fontSize: 13,            // was 11 — bigger, easier to read
    fontWeight: '600',       // NEW: a bit more weight so it's not too thin/faint
    color: COLORS.softTeal,  // was COLORS.text at 0.4 opacity — that was too
                              // light on white. softTeal at full opacity is
                              // muted but still readable.
    textTransform: 'lowercase',
  },
  navLabelActive: {
    fontWeight: '700',
    color: COLORS.coral,     // unchanged — active tab still reads coral
  },
});