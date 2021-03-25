import React, { useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import PokemonInfo from './PokemonInfo';


export default function PokemonLookup() {
    const [text, setText] = useState('')
    const [info, setPokemonInfo] = useState({})
    return(
        <View>
            <TextInput
                placeholder="Enter a Pokemon name"
                value={text}
                onChangeText={setText}
            />
            <Button 
                title="Search"
                onPress={() => get_pokemon_by_name(text, setPokemonInfo)}
            />
            <PokemonInfo {...info}/>
        </View>
    );
}

function get_pokemon_by_name(name, updateMethod) {
    const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon-species/'
    const url = ENDPOINT + name.toLowerCase() + '/'
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            updateMethod(json)
        }).catch(() => {
            updateMethod({})
        });
}