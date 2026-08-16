// components/FridgeStatusCard.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = {
  background: '#FAEFED',
  text: '#006078',
  white: '#FFFFFF',
};

type FridgeStatusCardProps = {
  status: string;
  itemCount: number;
};

export default function FridgeStatusCard({ status, itemCount }: FridgeStatusCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>🧊</Text>
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.label}>fridge status</Text>
        <Text style={styles.status}>{status}</Text>
        <Text style={styles.itemCount}>{itemCount} items inside</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,           // was 14 — more breathing room
    shadowColor: COLORS.text,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  iconWrap: {
    width: 56,              // was 44
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,        // was 14
  },
  icon: {
    fontSize: 28,           // was 22
  },
  textGroup: {
    flex: 1,
    gap: 4,                 // was 2 — a touch more room between lines
  },
  label: {
    fontSize: 14,           // was 12
    fontWeight: '700',      // was 600 — a bit more presence
    color: COLORS.text,
    opacity: 0.6,
    textTransform: 'lowercase',
  },
  status: {
    fontSize: 18,           // was 16
    fontWeight: '700',
    color: COLORS.text,
  },
  itemCount: {
    fontSize: 14,           // was 13
    color: COLORS.text,
    opacity: 0.6,
  },
});