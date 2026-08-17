// app/my-fridge.tsx

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodCard from '../components/FoodCard';

const COLORS = {
  background: '#FAEFED',
  coral: '#E37C78',
  text: '#006078',
  white: '#FFFFFF',
};

type Urgency = 'high' | 'medium' | 'low';

type FoodItem = {
  id: string;
  emoji: string;
  name: string;
  quantity: string;
  expiresText: string;
  urgency: Urgency;
  category: string;
};

// Placeholder data lives in the screen for now — no backend/storage yet.
const EXPIRING_SOON: FoodItem[] = [
  { id: 'e1', emoji: '🍓', name: 'strawberries', quantity: '1 punnet', expiresText: 'expires tomorrow', urgency: 'high', category: 'fruit' },
  { id: 'e2', emoji: '🥛', name: 'milk', quantity: '1 carton', expiresText: '2 days left', urgency: 'medium', category: 'dairy' },
];

const ALL_FOOD: FoodItem[] = [
  { id: 'a1', emoji: '🍓', name: 'strawberries', quantity: '1 punnet', expiresText: 'expires tomorrow', urgency: 'high', category: 'fruit' },
  { id: 'a2', emoji: '🥛', name: 'milk', quantity: '1 carton', expiresText: '2 days left', urgency: 'medium', category: 'dairy' },
  { id: 'a3', emoji: '🥬', name: 'lettuce', quantity: '1 head', expiresText: '4 days left', urgency: 'low', category: 'vegetable' },
  { id: 'a4', emoji: '🧀', name: 'cheddar cheese', quantity: '200g', expiresText: '1 week left', urgency: 'low', category: 'dairy' },
  { id: 'a5', emoji: '🥚', name: 'eggs', quantity: '6 left', expiresText: '5 days left', urgency: 'low', category: 'protein' },
];

export default function MyFridgeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🧊 my fridge</Text>
          <Text style={styles.subtitle}>everything currently hanging out in here</Text>
        </View>

        {/* Add food button */}
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={() => console.log('Add Food pressed (My Fridge)')}
        >
          <Text style={styles.addButtonText}>+ add food</Text>
        </Pressable>

        {/* Expiring soon */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>expiring soon 👀</Text>
          <View style={styles.cardList}>
            {EXPIRING_SOON.map((item) => (
              <FoodCard
                key={item.id}
                emoji={item.emoji}
                name={item.name}
                quantity={item.quantity}
                expiresText={item.expiresText}
                urgency={item.urgency}
                category={item.category}
              />
            ))}
          </View>
        </View>

        {/* All food */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>all food</Text>
          <View style={styles.cardList}>
            {ALL_FOOD.map((item) => (
              <FoodCard
                key={item.id}
                emoji={item.emoji}
                name={item.name}
                quantity={item.quantity}
                expiresText={item.expiresText}
                urgency={item.urgency}
                category={item.category}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },

  header: {
    marginBottom: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.65,
  },

  addButton: {
    backgroundColor: COLORS.coral,
    borderRadius: 100,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
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

  section: {
    marginBottom: 28,
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
});