import React from 'react';
import { navigate } from 'expo-router/build/global-state/routing';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen( ) {
  const navigation = useNavigation() 

  return (
    <View style={styles.container}>
    <View style={styles.balloonsContainer}>
      <TouchableOpacity style={styles.balloon}  onPress={( ) => navigation.navigate('ListaMotorista')}>
        <View style={styles.balloonContent}>
          <Text style={styles.balloonText}>Lista de Motoristas</Text>
          <Image source={require('@/assets/motorista.png')} style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.balloon} onPress={() => navigation.navigate('CadastroMotorista')}>
        <View style={styles.balloonContent}>
          <Text style={styles.balloonText}>Cadastrar Motorista</Text>
          <Image source={require('@/assets/cadastro.png')} style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.balloon} onPress={() => navigation.navigate('Inicio')}>
        <View style={styles.balloonContent}>
          <Text style={styles.balloonText}>Voltar para inicio</Text>
          <Image source={require('@/assets/seta.png')} style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  balloonsContainer: {
    marginBottom: 20,
  },
  balloon: {
    backgroundColor: '#127702', // cor verde
    paddingVertical: 30,//aumento da altura
    paddingHorizontal: 10, //mento da largura
    borderRadius: 30,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balloonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balloonText: {
    color: 'white',
    fontSize: 26,  // aumento do tamanho da fonte
    fontWeight: 'bold',
    marginRight: 10, // espaço entre o texto e a imagem
  },
  icon: {
    width: 100,  // largura da imagem
    height: 100, // altura da imagem
  },
});
