// app/index.tsx

import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ---- Colors ----
// Notice #006078 (dark teal) now only shows up in "text" and "accent" roles,
// never as a big filled background.
const COLORS = {
  background: '#FAEFED',
  cardPink: '#FFD4D1',
  coral: '#E37C78',
  softTeal: '#82BAC4',
  text: '#006078',
  white: '#FFFFFF',
};

// ---- Data ----
// Urgency drives which color badge a card gets. This is the only "logic"
// on the screen right now — everything else is still static/placeholder.
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

// Maps urgency -> badge background/text color. Keeping this separate from
// the JSX makes it easy to tweak the "vibe" later without touching layout.
const URGENCY_COLORS: Record<Urgency, { bg: string; text: string }> = {
  high: { bg: COLORS.coral, text: COLORS.white },
  medium: { bg: COLORS.cardPink, text: COLORS.text },
  low: { bg: '#EAF3F4', text: COLORS.softTeal },
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Decorative background shapes — purely visual, no meaning */}
      <View style={styles.decorCircleOne} />
      <View style={styles.decorCircleTwo} />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- BRAND ---------- */}
        <View style={styles.brandRow}>
          <View>
            <Text style={styles.brandName}>froji 🥕</Text>
            <Text style={styles.brandTagline}>your fridge's little sidekick</Text>
          </View>

          <View style={styles.mascotChip}>
            <Text style={styles.mascotEmoji}>🧊</Text>
          </View>
        </View>

        {/* ---------- HERO ---------- */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>hey bestie, what's in the fridge?</Text>
          <Text style={styles.heroSubtitle}>
            keep tabs on your food before it gets forgotten.
          </Text>
        </View>

        {/* ---------- EXPIRING SOON ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>expiring soon</Text>

          <View style={styles.cardList}>
            {PLACEHOLDER_FOOD.map((item) => {
              const badge = URGENCY_COLORS[item.urgency];
              return (
                <View key={item.id} style={styles.foodCard}>
                  <View style={styles.foodEmojiWrap}>
                    <Text style={styles.foodEmoji}>{item.emoji}</Text>
                  </View>

                  <View style={styles.foodTextGroup}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <View
                      style={[styles.badge, { backgroundColor: badge.bg }]}
                    >
                      <Text style={[styles.badgeText, { color: badge.text }]}>
                        {item.expiresText}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ---------- ADD FOOD ---------- */}
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={() => {
            // No navigation yet — placeholder for now.
            console.log('Add Food pressed');
          }}
        >
          <Text style={styles.addButtonText}>+ add food</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---- Styles ----
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
    paddingBottom: 40,
  },

  // Decorative shapes, positioned outside the normal flow so they don't
  // affect layout or spacing of the real content.
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

  // Brand
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

  // Hero
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

  // Section
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
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    shadowColor: COLORS.text,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  foodEmojiWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  foodEmoji: {
    fontSize: 22,
  },
  foodTextGroup: {
    flex: 1,
    gap: 6,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Add Food button
  addButton: {
    backgroundColor: COLORS.coral,
    borderRadius: 100, // pill shape
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
});