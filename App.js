import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const [weight, setWeight] = useState(0)
  const [intensity, setIntensity] = useState(1.3)
  const [gender, setGender] = useState('male')
  const [calories, setCalories] = useState(0)

  const intensities = [
    {label: 'light', value: 1.3},
    {label: 'usual', value: 1.5},
    {label: 'moderate', value: 1.7},
    {label: 'hard', value: 2},
    {label: 'very hard', value: 2.2}
  ]

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ]

  const calculate = () => {
    let result = 0
    if (gender === 'male') {
      result = (879 + 10.2 * weight) * intensity
    } else {
      result = (795 + 7.18 * weight) * intensity
    }
    setCalories(result)
  }

  return (
    <View style={styles.container}>
      <Text>Weight</Text>
      <View style={styles.field}>
        <TextInput
          placeholder='In kilograms'
          keyboardType='numeric'
          onChangeText={text => setWeight(text)}
          />
      </View>
      <View style={styles.field}>
        <Text>Intensity</Text>
        <Picker
          style={styles.intensity}
          onValueChange={(itemValue) => setIntensity(itemValue)}
          selectedValue={intensity}
        >
          {
            intensities.map((intensity, index) => (
              <Picker.Item key={index} label={intensity.label} value={intensity.value}/>
            ))
          }
        </Picker>
      </View>
      <View style={styles.field}>
          <Text>Gender</Text>
          <RadioForm
            style={styles.radio}
            buttonSize = {10}
            radio_props={genders}
            initial={0}
            onPress={value => setGender(value)}
          />
      </View>
      <View style={styles.field}>
          <Text>{calories.toFixed(0)}</Text>
      </View>
      <Button title="Calculate" onPress={calculate}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    margin: 8,
  },
  field: {
    marginBottom: 8,
    marginTop: 8,
  },
  radio: {
    marginTop: 8,
  },
  intensity: {
    alignSelf: 'stretch'
  }
});
