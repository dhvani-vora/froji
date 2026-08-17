// components/FoodCard.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  background: '#FAEFED',
  text: '#006078',
  white: '#FFFFFF',
};

type Urgency = 'high' | 'medium' | 'low';

type FoodCardProps = {
  emoji: string;
  name: string;
  expiresText: string;
  urgency: Urgency;
  quantity?: string;
  category?: string;
};

const URGENCY_COLORS: Record<Urgency, { bg: string; text: string }> = {
  high: { bg: '#E37C78', text: '#FFFFFF' },
  medium: { bg: '#FFD4D1', text: '#006078' },
  low: { bg: '#EAF3F4', text: '#006078' },
};

export default function FoodCard({
  emoji,
  name,
  expiresText,
  urgency,
  quantity,
  category,
}: FoodCardProps) {
  const badge = URGENCY_COLORS[urgency];

  return (
    <View style={styles.foodCard}>
      <View style={styles.foodEmojiWrap}>
        <Text style={styles.foodEmoji}>{emoji}</Text>
      </View>

      <View style={styles.foodTextGroup}>
        <View style={styles.nameRow}>
          <Text style={styles.foodName}>{name}</Text>
          {quantity ? <Text style={styles.quantity}>{quantity}</Text> : null}
        </View>

        <View style={styles.badge_and_category}>
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.text }]}>
              {expiresText}
            </Text>
          </View>

          {category ? (
            <Text style={styles.category}>{category}</Text>
          ) : null}
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  quantity: {
    fontSize: 13,       // was 13, kept — bumping the color instead
    color: COLORS.text,
    opacity: 0.75,       // was 0.55 — noticeably more readable now
    fontWeight: '500',   // NEW — a touch of weight so it doesn't look washed out
  },
  badge_and_category: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  category: {
    fontSize: 13,        // was 12 — a bit bigger
    color: COLORS.text,
    opacity: 0.6,          // was 0.45 — more readable
    fontWeight: '500',     // NEW — small weight bump for legibility
    textTransform: 'lowercase',
  },
});