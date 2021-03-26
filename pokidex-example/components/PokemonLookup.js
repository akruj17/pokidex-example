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
        <View style={styles.parent}>
            <TextInput
                style={styles.textInput}
                placeholder="Enter a Pokemon name"
                value={text}
                onChangeText={setText}
            />
            <Button 
                title="Search"
                onPress={() => get_pokemon_by_name(text, setPokemonInfo)}
            />
            {/* <Button
                title="Get me a Random Pokemon"
                onPress={() => navigation.navigate("RandomPokemon")}
            /> */}
            { info != null ? show_pokemon_info(info) : null }
        </View>
    );
}

function show_pokemon_info(info) {
    if (info.name === 'None') {
        return (
            <View>
                <Text style={styles.name}>No Matching Pokemon Found</Text>
            </View>
        )
    }
    funFact = info.flavor_text_entries[2].flavor_text.replaceAll("\n", " ")
    funFact = funFact.replaceAll("\f", " ")
    return (
        <View>
            <Text style={styles.name}>{`${info.name} Fun Stats:`}</Text>
            <Text style={styles.property}> {`Base Happiness: ${info.base_happiness}`} </Text>
            <Text style={styles.property}> {`Capture Rate: ${info.capture_rate}`} </Text>
            <Text style={styles.property}> {`Color: ${info.color.name}`} </Text>
            <Text style={styles.property}> {`Evolved From Species: ${info.evolves_from_species != null ? info.evolves_from_species.name : "None"}`} </Text>
            <Text style={styles.property}> {`Fun Fact: ${funFact}`} </Text>
        </View>
        
    )
} 

function get_pokemon_by_name(name, updateMethod) {
    const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon-species/';
    const url = ENDPOINT + name.toLowerCase() + '/';
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            updateMethod(json);
        }).catch((e) => {
           updateMethod({"name": "None"});
        });
}

const styles = StyleSheet.create({
    name: {
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 30,
    },
    property: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    textInput: {
        fontSize: 20,
        margin: 10,
        borderColor: '#cccccc',
        borderStyle: 'solid',
        borderWidth: 5,
        paddingLeft: 10,
    },
    parent: {
        margin: 10,
    }
});
  