import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput, ScrollView, Modal, Alert } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import ModalConfirmacao from '../modal/ModalConfirmacao';
import ModalErro from '../modal/ModalErro';



export default function Resgate({ route }) {
    const [resgate, setResgate] = useState([]);
    const [totalResgate, setTotalResgate] = useState('');
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [modalErro, setModalErro] = useState(false);

    const acoes = route.params?.item.acoes;


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
        let saldoTotal = route.params?.item.saldoTotal;
        let saldoAcumulado = 0;
        saldoAcumulado = percentual / 100 * saldoTotal;

        var monetario = saldoAcumulado
        return monetario
    }




    function valorResgate(texto, i) {
        let formatar = texto.replace('R$', '').replace('.', '').replace(' ', '');
        let formatarMoeda = formatar.replace(',', '.')
        const array = [...resgate];
        array[i.id] = {
            ...i,
            valorResgatar: formatarMoeda,
            erro: formatarMoeda > percentual(i.percentual) ? true : false
        }

        setResgate(array);
        somarValor(array);



    }


    function somarValor(array) {
        let total = 0;
        for (let x in array) {
            const xpto = array[x]
            if (xpto && xpto.valorResgatar) {
                total += parseFloat(xpto.valorResgatar)
            }
        }
        setTotalResgate(total)
    }

    function abrirModal() {

        for (let x in resgate) {
            const xpto = resgate[x]
            if (xpto && xpto.erro === true) {
                setModalErro(true)
                return;
            }

        }
        if (totalResgate === '') {
            alert('Selecione um valor valido.')
            return;
        } else {
            setModalConfirmacao(true)
        }


    }

    function fecharModal() {
        setModalErro(false)
    }





    const acoesList = (({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.corpo}>
                    <Text style={styles.texto}>Ação</Text>
                    <Text style={styles.texto2}>{dePara(item.nome)}</Text>
                </View>
                <View style={styles.corpo}>
                    <Text style={styles.texto}>Saldo acumulado</Text>
                    <Text style={styles.texto2}>{percentual(item.percentual).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                </View>
                <View style={styles.corpo}>
                    <MaskInput
                        style={styles.input}
                        placeholder='Valor a resgatar'
                        keyboardType="numeric"
                        mask={Masks.BRL_CURRENCY}
                        value={resgate[item.id] && resgate[item.id].valorResgatar || ''}


                        onChangeText={(texto) => valorResgate(texto, item)}
                    />

                </View>
                {resgate[item.id] && resgate[item.id].erro &&
                    <View style={styles.corpo}>
                        <Text style={styles.textErro}>Valor não pode ser maior que {percentual(item.percentual).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                    </View>
                }
                <Modal transparent={true} animationType='slide' visible={modalErro}>{<ModalErro data={{ route, resgate }} fechar={fecharModal} />}</Modal>
                <Modal transparent={true} animationType='slide' visible={modalConfirmacao}>{<ModalConfirmacao />}</Modal>
            </View>


        )
    })



    return (
        <View style={styles.container}>
            
                <View style={styles.corpo2}>
                    <Text style={styles.texto2}>Dados do investimento</Text>
                </View>

                <View style={styles.corpo}>
                    <Text style={styles.texto}>Nome</Text>
                    <Text style={styles.texto2}>{route.params?.item.nome}</Text>
                </View>
                <View style={styles.corpo}>
                    <Text style={styles.texto}>Saldo Total Disponível</Text>
                    <Text style={styles.texto2}>{route.params?.item.saldoTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                </View>
                <View style={styles.corpo2}>
                    <Text style={styles.texto2}>Resgate do Seu Jeito</Text>
                </View>
                <FlatList
                    data={acoes}
                    renderItem={acoesList}
                    
                />
                <View style={styles.corpo2}>
                    <Text style={styles.texto2}>Valor total a resgatar</Text>
                    <Text style={styles.texto2}>{totalResgate.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
                </View>

                <Button title='CONFIRMAR RESGATE' style={styles.button} onPress={abrirModal} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD'
    },
    corpo: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10,
        marginBottom: 5,
        backgroundColor: 'white',
        marginBottom: 1

    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#696969'
    },
    texto2: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    corpo2: {
        padding: 13,

    },
    input: {
        flex: 1,
        fontWeight: 'bold'
    },
    textErro: {
        color: 'red',
        marginLeft: 13

    }


})