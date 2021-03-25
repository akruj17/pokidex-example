import React from 'react';
import { View, Text, StyleSheet} from 'react-native'

export default function PokemonLookup(props) {
    return(
        <View>
            {props.name && 
                <View>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.property}>growth rate: {props.growth_rate.name}</Text>
                    <Text style={styles.property}>capture rate: {props.capture_rate}</Text>
                    <Text style={styles.property}>shape: {props.shape.name}</Text> 
                </View>
            }
        </View>
    )     
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
    }
});