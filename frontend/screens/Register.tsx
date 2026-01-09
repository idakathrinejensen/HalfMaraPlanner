//register
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    experienceLevel: '',
    duration: '',
    raceDate: '',
  });
  const navigation = useNavigation<any>();

  function updateUserData(newFields: Partial<typeof userData>) {
    setUserData(prev => ({ ...prev, ...newFields }));  // Merge new fields with existing data
  }

  // SAfee area view for notches etc 
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#00171f',
    }}>
      <View style={{
        width: '100%',
        height: 'auto',
        backgroundColor: '#1e293b',
        borderRadius: 20,
        padding: 20,
      }}>
        {step === 1 && (
          <CreateAccount
            onNext={() => setStep(2)}
            updateUserData={updateUserData}
          />
        )}
        {step === 2 &&
          <Experience
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            updateUserData={updateUserData}
          />}
        {step === 3 && (
          <TrainingPlan
            onBack={() => setStep(2)}
            onSubmit={() => ('Registered!')}
            updateUserData={updateUserData}
          />
        )}
      </View>
    </SafeAreaView>

  );


  // Step 1
  function CreateAccount({ onNext, updateUserData }: { onNext: () => void; updateUserData: (data: any) => void }) {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid =
      fullName.trim().length > 0 && // not empty
      emailRegex.test(email.toLowerCase().trim()) &&  // valid email format
      password.length >= 6 && // at least 6 characters
      /\d/.test(password); // at least one number


    return (
      <View style={{ gap: 16 }}>

        {/* TITLE */}
        <Text style={{
          color: '#8B80F9',
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
          onChangeText={(text) => setEmail(text.trim().toLowerCase())}
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
        <Text style={{ color: '#94a3b8', fontSize: 12 }}>Password must be at least 6 characters and include a number.</Text>

        {/* CONTINUE BUTTON */}
        <Pressable
          onPress={() => {
            if (!isValid) return;

            updateUserData({
              fullName,
              email,
              password,
            });
            onNext();
          }}
          style={{
            backgroundColor: isValid ? '#8B80F9' : '#475569',
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
  function Experience({ onNext, onBack, updateUserData }: { onNext: () => void; onBack: () => void; updateUserData: (data: any) => void }) {

    const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);
    const isValid = experienceLevel !== null;

    return (
      <View>
        <Text style={{
          color: '#8B80F9',
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
        >Experience Level</Text>

        {/* LEVEL OPTIONS */}
        <Pressable
          onPress={() => setExperienceLevel('beginner')}
          style={{
            backgroundColor: experienceLevel === 'beginner' ? '#3b82f6' : '#0f172a',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: experienceLevel === 'beginner' ? '#3b82f6' : '#94a3b8',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Beginner</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>I'm new to running or returning after a break</Text>
        </Pressable>

        <Pressable
          onPress={() => setExperienceLevel('intermediate')}
          style={{
            backgroundColor: experienceLevel === 'intermediate' ? '#3b82f6' : '#0f172a',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: experienceLevel === 'intermediate' ? '#3b82f6' : '#94a3b8',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Intermediate</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>I can run 10km comfortably</Text>
        </Pressable>

        <Pressable
          onPress={() => setExperienceLevel('advanced')}
          style={{
            backgroundColor: experienceLevel === 'advanced' ? '#3b82f6' : '#0f172a',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: experienceLevel === 'advanced' ? '#3b82f6' : '#94a3b8',
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
            onPress={() => {
              if (!isValid) return;

              updateUserData({
                experienceLevel,
              });
              onNext();
            }}

            style={{
              flex: 1,
              backgroundColor: isValid ? '#8B80F9' : '#475569',
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
  function TrainingPlan({ onBack, onSubmit, updateUserData }: { onBack: () => void; onSubmit: () => void; updateUserData: (data: any) => void }) {

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
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const isValid = duration !== '' && raceDate !== '';

    return (
      <View style={{ gap: 16 }}>
        <Text style={{
          color: '#8B80F9',
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

        <Pressable
          onPress={() => setOpenDatePicker(true)}
          style={{
            backgroundColor: '#0f172a',
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#334155',
          }}
        >
          <Text style={{ color: selectedDate ? 'white' : '#94a3b8' }}>
            {raceDate || 'Select race date'}
          </Text>
        </Pressable>

        {openDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setOpenDatePicker(false);
              if (date) {
                setSelectedDate(date);
                const formattedDate = date.toISOString().split('T')[0];
                setRaceDate(formattedDate);
              }
            }}
            minimumDate={new Date()}
          />
        )}


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
            onPress={async () => {
              if (!isValid) return;

              updateUserData({ duration, raceDate });

              const payload = {
                ...userData,
                duration,
                raceDate,
              };

              try {
                const res = await fetch("http://localhost:3000/user/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (!data.success) {
                  alert(data.message);
                  return;
                }

                alert("Account created!");
                navigation.navigate("HomeScreen" as never);
              } catch (err) {
                console.log(err);
                alert("Failed to connect to backend.");
              }
            }}
            style={{
              flex: 1,
              backgroundColor: isValid ? '#8B80F9' : '#475569',
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#334155',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Create Account</Text>
          </Pressable>
        </View>
      </View>
    );

  }

}
