// components/WasteSavingsCard.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  cardPink: '#FFD4D1',
  text: '#006078',
  white: '#FFFFFF',
};

type WasteSavingsCardProps = {
  itemsSaved: number;
};

export default function WasteSavingsCard({ itemsSaved }: WasteSavingsCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>♻️ you've saved...</Text>
      <Text style={styles.statValue}>{itemsSaved} items this week</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardPink,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    shadowColor: COLORS.text,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,     // was coral — now dark teal, readable on pink
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,     // was coral — same fix here
  },
});