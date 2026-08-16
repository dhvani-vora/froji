// components/FoodCard.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  background: '#FAEFED',
  text: '#006078',
  white: '#FFFFFF',
};

// The three allowed urgency values. TypeScript will now yell at us
// if anyone tries to pass urgency="urgent" or anything not in this list.
type Urgency = 'high' | 'medium' | 'low';

// This describes exactly what FoodCard expects from its parent.
// Think of it as the "contract" for this component.
type FoodCardProps = {
  emoji: string;
  name: string;
  expiresText: string;
  urgency: Urgency;
};

// Badge colors live here now, since badge styling is FoodCard's job.
// Low-urgency text fixed to #006078 for contrast (was #82BAC4 on #EAF3F4).
const URGENCY_COLORS: Record<Urgency, { bg: string; text: string }> = {
  high: { bg: '#E37C78', text: '#FFFFFF' },
  medium: { bg: '#FFD4D1', text: '#006078' },
  low: { bg: '#EAF3F4', text: '#006078' },
};

export default function FoodCard({ emoji, name, expiresText, urgency }: FoodCardProps) {
  const badge = URGENCY_COLORS[urgency];

  return (
    <View style={styles.foodCard}>
      <View style={styles.foodEmojiWrap}>
        <Text style={styles.foodEmoji}>{emoji}</Text>
      </View>

      <View style={styles.foodTextGroup}>
        <Text style={styles.foodName}>{name}</Text>
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.badgeText, { color: badge.text }]}>
            {expiresText}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});