import React, { useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RandomPokemon() {
    const [pokemonName, setPokemonName] = useState("Get a Pokemon!");
    const navigation = useNavigation();

    return(
        <View>
            <Button
                color="#ff0000"
                title="Get a Random Pokemon"
                onPress={() => get_random_pokemon(setPokemonName, navigation)}
            />
            <Button
                title="Look up a Pokemon"
                onPress={() => navigation.navigate("PokemonLookup", { pokemonName: null})}
            />
        </View>
        
    );
}

function get_random_pokemon(updateMethod, navigation) {
    const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon-species/'
    // choose a random index between 1 and 100
    const random_idx = Math.floor(Math.random() * Math.floor(100)) + 1;
    const url = ENDPOINT + random_idx + '/'
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            updateMethod(json.name)
            navigation.navigate("PokemonLookup", { pokemonName: json.name})
        });
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        textAlign: 'center',
        fontSize: 100,
        marginBottom: 30,
        backgroundColor: '#ff0000'
    }
  });

