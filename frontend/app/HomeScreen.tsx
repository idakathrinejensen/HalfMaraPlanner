//this is a homescreen
import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {          
    return (    
        <View style={{
            flex: 1,
            backgroundColor: '#0f172a',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{
                color: '#a78bfa',
                fontSize: 32,
                fontWeight: '600',
            }}>
                Home Screen
            </Text>
        </View>
    );
}