import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'



export default props => {



    return (
        <View style={styles.container}>
            <Text style={styles.text}>Resgate</Text>
        </View>


    )

}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#3391ff',
        borderBottomColor: '#fffc49',
        borderBottomWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20
    }

});