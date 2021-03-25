import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PokemonLookup() {
    const [text, setText] = useState('')
    const [info, setPokemonInfo] = useState()
    const navigation = useNavigation();
    const route = useRoute();


    useEffect(() => {
        if(route.params.pokemonName != null) {
            setText(route.params.pokemonName)
            get_pokemon_by_name(route.params.pokemonName, setPokemonInfo)
        }
    }, [route.params.pokemonName])


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
            { info != null ? show_info(text, info) : null }
            <Button
                title="Get me a Random Pokemon"
                onPress={() => navigation.navigate("RandomPokemon")}
            />
        </View>
    );
}

function show_info(name, info) {
    funFact = info.flavor_text_entries[2].flavor_text.replaceAll("\n", " ")
    funFact = funFact.replaceAll("\f", " ")
    return (
        <View>
            <Text>{`${name} Fun Stats:`}</Text>
            <Text> {`Base Happiness: ${info.base_happiness}`} </Text>
            <Text> {`Capture Rate: ${info.capture_rate}`} </Text>
            <Text> {`Color: ${info.color.name}`} </Text>
            <Text> {`Evolved From Species: ${info.evolves_from_species != null ? info.evolves_from_species.name : "None"}`} </Text>
            <Text> {`Fun Fact: ${funFact}`} </Text>
        </View>
        
    )
} 

function get_pokemon_by_name(name, updateMethod) {
    const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon-species/'
    const url = ENDPOINT + name.toLowerCase() + '/'
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            updateMethod(json)
        }).catch((e) => {
            console.log(e)
        });
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  