import React, { useState} from 'react';
import { View, Text, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import PokemonInfo from './PokemonInfo';

export default function RandomPokemon() {
    const [name, setName] = useState("Get a Pokemon!");
    const navigation = useNavigation();
    const route = useRoute();
    return(
        <View>
            <Button
                title="Get Random Pokemon"
                onPress={() => get_random_pokemon(setPokemonInfo)}
            />
            <Button
                title="Look up a My Pokemon"
                onPress={() => navigation.navigate("PokemonLookup", { pokemonName: name })}
            />
            <Button
                title="Look up a Pokemon"
                onPress={() => navigation.navigate("PokemonLookup", { pokemonName: null})}
            />
        </View>
        
    );
}

function get_random_pokemon(updateMethod) {
    const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon-species/'
    // choose a random index between 1 and 100
    const random_idx = Math.floor(Math.random() * Math.floor(100)) + 1;
    const url = ENDPOINT + random_idx + '/'
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            updateMethod(json)
        });
}

