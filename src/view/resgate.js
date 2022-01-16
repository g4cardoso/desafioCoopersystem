import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput, ScrollView, Modal, Alert } from 'react-native';
import ModalConfirmacao from '../modal/ModalConfirmacao';
import ModalErro from '../modal/ModalErro';



export default function Resgate({ route }) {
    const [resgate, setResgate] = useState([]);
    const [totalResgate, setTotalResgate] = useState('0');
    const [modalConfirmacao, setModalConfirmacao]= useState(false);
    const [modalErro, setModalErro]= useState(false);

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
        
        var monetario = saldoAcumulado.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        return monetario
    }




    function valorResgate(texto, i) {
        const array = resgate;
        array[i.id] = {
            ...i,
            valorResgatar: texto
        }
        setResgate(array)
        somarValor();
        

    }


    function somarValor(){
      
       let total = resgate.reduce((total,valor) => total + parseInt(valor.valorResgatar),0)
       setTotalResgate(total);

    }

    function abrirModal(){
        if (totalResgate === '0' ){
            alert('Selecione um valor valido.')
            return;
        }
        if(totalResgate > route.params?.item.saldoTotal){
            setModalErro(true)
        }else{
            setModalConfirmacao(true) 
        }
        

    }

    function fecharModal(){
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
                    <Text style={styles.texto2}>{percentual(item.percentual)}</Text>
                </View>
                <View style={styles.corpo}>
                    <TextInput
                        style={styles.input}
                        placeholder='Valor a resgatar'
                        keyboardType="numeric"
                        
                        onChangeText={(texto => valorResgate(texto, item))}
                    />
                    
                </View>
                <Modal transparent={true} animationType='slide' visible={modalErro}>{<ModalErro data={route} fechar={fecharModal}/>}</Modal>
                <Modal transparent={true} animationType='slide' visible={modalConfirmacao}>{<ModalConfirmacao/>}</Modal> 
            </View>


        )
    })



    return (
        <View style={styles.container}>
            <ScrollView horizontal={false} >
                <View style={styles.corpo2}>
                    <Text style={styles.texto2}>Dados do investimento</Text>
                </View>

                <View style={styles.corpo}>
                    <Text style={styles.texto}>Nome</Text>
                    <Text style={styles.texto2}>{route.params?.item.nome}</Text>
                </View>
                <View style={styles.corpo}>
                    <Text style={styles.texto}>Saldo Total Disponivel</Text>
                    <Text style={styles.texto2}>{route.params?.item.saldoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                </View>
                <View style={styles.corpo2}>
                    <Text style={styles.texto2}>Resgate do Seu Jeito</Text>
                </View>
                <FlatList
                    data={acoes}
                    renderItem={acoesList}
                    scrollEnabled
                />
                <View style={styles.corpo2}>
                    <Text style={styles.texto2}>Valor total a resgatar</Text>
                    <Text style={styles.texto2}>{totalResgate.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                </View>

                <Button title='CONFIRMAR RESGATE' style={styles.button} onPress={abrirModal} />
            </ScrollView>
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
    }


})