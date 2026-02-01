// components/CoefficientInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CoefficientInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CoefficientInput: React.FC<CoefficientInputProps> = ({
  label,
  value,
  onChange,
  placeholder = '0',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        keyboardType="numbers-and-punctuation"
        placeholder={placeholder}
        placeholderTextColor="#888"
      />
      <Text style={styles.hint}>Floating-point</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    width: 60,
    color: '#333',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#b2ebf2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#f8fdff',
    marginRight: 15,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    width: 100,
  },
});

export default CoefficientInput;
