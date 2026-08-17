// app/add-food.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#FAEFED',
  coral: '#E37C78',
  softTeal: '#82BAC4',
  text: '#006078',
  cardPink: '#FFD4D1',
  white: '#FFFFFF',
};

// A fixed set of allowed categories, instead of any random string.
// This means TypeScript will catch a typo like 'frutis' at compile time.
type Category = 'fruits' | 'vegetables' | 'dairy' | 'grains' | 'drinks' | 'other';

type CategoryOption = {
  value: Category;
  label: string;
  emoji: string;
};

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'fruits', label: 'fruits', emoji: '🍓' },
  { value: 'vegetables', label: 'vegetables', emoji: '🥬' },
  { value: 'dairy', label: 'dairy', emoji: '🥛' },
  { value: 'grains', label: 'grains', emoji: '🍞' },
  { value: 'drinks', label: 'drinks', emoji: '🧃' },
  { value: 'other', label: 'other', emoji: '📦' },
];

// Shape of the final data we collect. Not saved anywhere yet —
// just logged, so this is the "contract" for when storage comes later.
type FoodDraft = {
  name: string;
  quantity: string;
  expiryDate: string;
  category: Category;
};

export default function AddFoodScreen() {
  const router = useRouter();

  // One useState per form field. Each holds the current value of its
  // matching input, and each has a setter function to update it.
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Shown only when validation fails.
  const [errorMessage, setErrorMessage] = useState('');

  function handleSave() {
    // Basic required-field validation.
    if (!foodName.trim() || !quantity.trim() || !expiryDate.trim() || !selectedCategory) {
      setErrorMessage('please fill in every field before saving 🥲');
      return;
    }

    // Build the typed object we'd eventually send to storage/a backend.
    const newFood: FoodDraft = {
      name: foodName.trim(),
      quantity: quantity.trim(),
      expiryDate: expiryDate.trim(),
      category: selectedCategory,
    };

    console.log('New food item:', newFood);

    // Clear any leftover error, then go back to My Fridge.
    setErrorMessage('');
    router.back();
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← back</Text>
          </Pressable>

          <Text style={styles.title}>add food</Text>
          <Text style={styles.subtitle}>tell froji what just entered the fridge</Text>
        </View>

        {/* Food name */}
        <View style={styles.field}>
          <Text style={styles.label}>food name</Text>
          <TextInput
            style={styles.input}
            value={foodName}
            onChangeText={setFoodName}
            placeholder="e.g. strawberries"
            placeholderTextColor="#99B7BE"
          />
        </View>

        {/* Quantity */}
        <View style={styles.field}>
          <Text style={styles.label}>quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="e.g. 1 box"
            placeholderTextColor="#99B7BE"
            // "default" allows letters + numbers, since quantity can be
            // "1 box" rather than a pure number.
            keyboardType="default"
          />
        </View>

        {/* Expiry date */}
        <View style={styles.field}>
          <Text style={styles.label}>expiry date</Text>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="e.g. 20 aug 2026"
            placeholderTextColor="#99B7BE"
          />
        </View>

        {/* Category */}
        <View style={styles.field}>
          <Text style={styles.label}>category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORY_OPTIONS.map((option) => {
              const isSelected = selectedCategory === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                  onPress={() => setSelectedCategory(option.value)}
                >
                  <Text style={styles.categoryEmoji}>{option.emoji}</Text>
                  <Text
                    style={[
                      styles.categoryLabel,
                      isSelected && styles.categoryLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Validation message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Save button */}
        <Pressable
          style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>save food 🥕</Text>
        </Pressable>
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
    marginBottom: 26,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    opacity: 0.7,
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

  field: {
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: 8,
    textTransform: 'lowercase',
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
    shadowColor: COLORS.text,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  categoryChipSelected: {
    backgroundColor: COLORS.cardPink,
    borderColor: COLORS.coral,
  },
  categoryEmoji: {
    fontSize: 15,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
    opacity: 0.7,
    textTransform: 'lowercase',
  },
  categoryLabelSelected: {
    opacity: 1,
    fontWeight: '700',
    color: COLORS.coral,
  },

  errorText: {
    fontSize: 13,
    color: COLORS.coral,
    fontWeight: '600',
    marginBottom: 14,
    textAlign: 'center',
  },

  saveButton: {
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
  saveButtonPressed: {
    opacity: 0.85,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});