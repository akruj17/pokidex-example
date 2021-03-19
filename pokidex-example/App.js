import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { create } from 'react-test-renderer';
import RandomPokemon from './components/RandomPokemon';
import PokemonLookup from './components/PokemonLookup';

export default function App() {

  const NavStack = createStackNavigator();

  return (
    <NavigationContainer>
      <NavStack.Navigator>
        <NavStack.Screen name="RandomPokemon" component={RandomPokemon}/>
        <NavStack.Screen name="PokemonLookup" component={PokemonLookup}/>
      </NavStack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
