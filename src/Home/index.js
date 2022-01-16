import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import api from '../api/Api';

export default function Home() {
  const [investimentos, setInvestimentos] = useState('')
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await api.get('v3/ca4ec77d-b941-4477-8a7f-95d4daf7a653')
      const {
        response: {
          data: { listaInvestimentos }
        }
      } = response.data;
      setInvestimentos(listaInvestimentos);      
      log(JSON.stringify(investimentos))     

    })();
  },[])

 
  const investimentosList = (({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          disabled={item.indicadorCarencia !== "N"}
          onPress={() => navigation.navigate('Resgate', { item })}
        >
          <View style={styles.view}>
            <View>
              <Text>{item.nome}</Text>
              <Text >{item.objetivo}</Text>
            </View>
            <Text> {item.saldoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
          </View>

        </TouchableOpacity>

      </View>


    )
  })



  return (
    <View>
      <Header />
      <View style={styles.view}>
        <Text>INVESTIMENTOS</Text>
        <Text>R$</Text>
      </View>
      <FlatList
        data={investimentos}
        keyExtractor={investimentos.nome}
        renderItem={investimentosList}
      />

    </View>


  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#DDDDDD"    

  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  view: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    

  }




});