//register
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Register() {
  const [step, setStep] = useState<number>(1);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#0f172a',
    }}>
      <View style={{
        width: '100%',
        height: 'auto',
        backgroundColor: '#1e293b',
        borderRadius: 20,
        padding: 20,
      }}>
        {step === 1 && <CreateAccount onNext={() => setStep(2)} />}
        {step === 2 && <Experience onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <TrainingPlan onBack={() => setStep(2)} onSubmit={() => alert('Registered!')} />}
      </View>
    </View>

  )


  // Step 1
  function CreateAccount({ onNext }: { onNext: () => void }) {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
      <View style={{ gap: 16 }}>

        {/* TITLE */}
        <Text style={{
          color: '#8B82F9',
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 10,
        }}>
          Create Account
        </Text>

        {/* FORM FIELDS */}
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor={'#94a3b8'}
          style={{
            backgroundColor: '#0f172a',
            padding: 12,
            borderRadius: 12,
            color: 'white',
          }} />


        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={'#94a3b8'}
          style={{
            backgroundColor: '#0f172a',
            padding: 12,
            borderRadius: 12,
            color: 'white',
          }} />


        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Password</Text>
        <TextInput
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'#94a3b8'}
          secureTextEntry={true}
          style={{
            backgroundColor: '#0f172a',
            padding: 12,
            borderRadius: 12,
            color: 'white',
          }} />

        {/* CONTINUE BUTTON */}
        <Pressable
          onPress={onNext}
          style={{
            backgroundColor: '#8B82F9',
            padding: 15,
            borderRadius: 12,
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#334155',
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  // Step 2
  function Experience({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);
    return (
      <View>
        <Text style={{
          color: '#8B82F9',
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
        >Experience Level</Text>

        {/* LEVEL OPTIONS */}
        <Pressable
          onPress={() => setLevel('beginner')}
          style={{
            backgroundColor: level === 'beginner' ? '#3b82f6' : '#0f172a',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: level === 'beginner' ? '#3b82f6' : '#94a3b8',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Beginner</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>I'm new to running or returning after a break</Text>
        </Pressable>

        <Pressable
          onPress={() => setLevel('intermediate')}
          style={{
            backgroundColor: level === 'intermediate' ? '#3b82f6' : '#0f172a',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: level === 'intermediate' ? '#3b82f6' : '#94a3b8',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Intermediate</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>I can run 10km comfortably</Text>
        </Pressable>

        <Pressable
          onPress={() => setLevel('advanced')}
          style={{
            backgroundColor: level === 'advanced' ? '#3b82f6' : '#0f172a',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: level === 'advanced' ? '#3b82f6' : '#94a3b8',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Advanced</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>I'm an experienced runner</Text>
        </Pressable>

        {/* BACK + CONTINUE BUTTONS */}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <Pressable
            onPress={onBack}
            style={{
              flex: 1,
              backgroundColor: '#1e293b',
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#334155',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Back</Text>
          </Pressable>

          <Pressable
            onPress={onNext}
            style={{
              flex: 1,
              backgroundColor: '#8B82F9',
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#334155',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Continue</Text>
          </Pressable>
        </View>
      </View>
    );
  }


  // Step 3
  function TrainingPlan({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
    const [open, setOpen] = useState(false);
    const [duration, setDuration] = useState<string>('12');
    const [durationItems, setDurationItems] = useState([
      { label: '8 weeks', value: '8' },
      { label: '10 weeks', value: '10' },
      { label: '12 weeks', value: '12' },
      { label: '16 weeks', value: '16' },
      { label: '20 weeks', value: '20' },
    ]);
    const [raceDate, setRaceDate] = useState<string>('');

    return (
      <View style={{ gap: 16 }}>
        <Text style={{
          color: '#8B82F9',
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 10,
        }}>
          Training Plan
        </Text>

        {/* FORM FIELDS */}
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Training Duration (weeks)</Text>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={open}
            value={duration}
            items={durationItems}
            setOpen={setOpen}
            setValue={(callback) => {
              setDuration(callback(duration));
            }}
            setItems={setDurationItems}
            placeholder="Select duration"
            placeholderStyle={{ color: '#94a3b8' }}
            style={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
            }}
            dropDownContainerStyle={{
              backgroundColor: '#1e293b',
              borderColor: '#334155',
            }}
            textStyle={{
              color: 'white',
            }}
            listItemLabelStyle={{ color: 'white' }}
          />
        </View>


        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Target Race Date</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          placeholderTextColor={'#94a3b8'}
          value={raceDate}
          onChangeText={setRaceDate}
          style={{
            backgroundColor: '#0f172a',
            padding: 12,
            borderRadius: 12,
            color: 'white',
          }} />

        <View style={{
          backgroundColor: '#1e293b',
          padding: 14,
          borderRadius: 12,
          flexDirection: 'row',
          gap: 10,
          borderWidth: 1,
          borderColor: '#334155',
        }}>
          <Text style={{ color: 'white', flex: 1 }}>
            Your personalized {duration || '--'}-week training plan will be created based on your level of experience.
          </Text>
        </View>

        {/* BACK + CONTINUE BUTTONS */}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <Pressable
            onPress={onBack}
            style={{
              flex: 1,
              backgroundColor: '#1e293b',
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#334155',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Back</Text>
          </Pressable>

          <Pressable
            onPress={onSubmit}
            style={{
              flex: 1,
              backgroundColor: '#8B82F9',
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#334155',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Continue</Text>
          </Pressable>
        </View>
      </View>
    );

  }

}
