import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';



export default props => {
    const navigation = useNavigation();
    const acoes = props.data.params.item.acoes;

    function dePara(item) {
        if (item === "Banco do Brasil (BBAS3)") return 'BBAS3';
        if (item === "Vale (VALE3)") return 'VALE3';
        if (item === "Petrobras (PETR4)") return 'PETR4';
        if (item === "Cemig (CMIG3)") return 'CMIG3';
        if (item === "Oi (OIBR3)") return 'OIBR3';

        return 'faltou' + item;
    }


    function percentual(item) {
        let percentual = item;
        let saldoTotal = props.data.params.item.saldoTotal;
        let saldoAcumulado = 0;
        saldoAcumulado = percentual / 100 * saldoTotal;

        var monetario = saldoAcumulado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return monetario
    }


    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View >
                    <Text  style={styles.text}>DADOS INVÁLIDOS</Text>
                </View>

                <View style={styles.corpo}>
                    <Text style={styles.text} > Vocẽ preencheu um ou mais campos com valor acima do permitido:</Text>
                </View>


                <FlatList
                    data={acoes}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.corpo}>
                                <View style={styles.corpo1}>
                                    <Text style={styles.text} >{dePara(item.nome)}</Text>
                                    <Text style={styles.text} >: Valor máximo de </Text>
                                    <Text style={styles.text} >{percentual(item.percentual)}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
                <View style={styles.button}>
                    <Button title='Corrigir' onPress={props.fechar} />
                </View>

            </View>


        </View>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
    },
    modal: {
        backgroundColor: '#F5FFFA',
        width: '100%',
        height: 350,
    },
    text: {
        textAlign: 'center',
        justifyContent: 'flex-end',
        fontSize: 20
    },    
    teste: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    corpo: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: 5
             
    },
    corpo1:{
        flexDirection: 'row',
        padding: 10,
        marginBottom: 5,        
        marginBottom: 1,
    }
});