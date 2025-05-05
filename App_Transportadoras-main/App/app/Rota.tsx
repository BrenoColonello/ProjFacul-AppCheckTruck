import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

import  { useNavigation } from '@react-navigation/native';


interface Caminhao {
  id: string;
  nome: string;
  placa: string;
  motoristaId: string;
  latitude: number; // Coordenadas para o mapa
  longitude: number;
}

interface Motorista {
  id: string;
  nome: string;
}

export default function RotaScreen() {
  const navigation = useNavigation();
  const [caminhoes, setCaminhoes] = useState<Caminhao[]>([]);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  // Carrega os caminhões do AsyncStorage
  const carregarCaminhoes = async () => {
    // try {
    //   const caminhoesSalvos = await AsyncStorage.getItem('caminhoes');
    //   if (caminhoesSalvos) {
    //     setCaminhoes(JSON.parse(caminhoesSalvos));
    //   }
    // } catch (error) {
    //   console.error('Erro ao carregar caminhões:', error);
    // }
  };

  // Carrega os motoristas do AsyncStorage
  const carregarMotoristas = async () => {
    // try {
    //   const motoristasSalvos = await AsyncStorage.getItem('motoristas');
    //   if (motoristasSalvos) {
    //     setMotoristas(JSON.parse(motoristasSalvos));
    //   }
    // } catch (error) {
    //   console.error('Erro ao carregar motoristas:', error);
    // }
  };

  useEffect(() => {
    carregarCaminhoes();
    carregarMotoristas();
  }, []);

  // Obtém o nome do motorista associado ao caminhão
  const obterNomeMotorista = (motoristaId: string) => {
    const motorista = motoristas.find((m) => m.id === motoristaId);
    return motorista ? motorista.nome : 'Não atribuído';
  };

  // Função para excluir um caminhão
  const excluirCaminhao = async (id: string) => {
    Alert.alert(
      'Excluir Caminhão',
      'Tem certeza de que deseja excluir este caminhão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const caminhoesAtualizados = caminhoes.filter((caminhao) => caminhao.id !== id);
              setCaminhoes(caminhoesAtualizados);
              // await AsyncStorage.setItem('caminhoes', JSON.stringify(caminhoesAtualizados));
            } catch (error) {
              console.error('Erro ao excluir caminhão:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderCaminhao = ({ item }: { item: Caminhao }) => (
    <View style={styles.caminhaoContainer}>
      <Text style={styles.caminhaoNome}>Caminhão: {item.nome}</Text>
      <Text style={styles.caminhaoInfo}>Placa: {item.placa}</Text>
      <Text style={styles.caminhaoInfo}>Motorista: {obterNomeMotorista(item.motoristaId)}</Text>
      <Text style={styles.caminhaoInfo}>Localização: {item.latitude}, {item.longitude}</Text>
      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => excluirCaminhao(item.id)}
      >
        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const handleVoltar = () => {
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>

      <View style={styles.listaContainer}>
        <FlatList
          data={caminhoes}
          keyExtractor={(item) => item.id}
          renderItem={renderCaminhao}
          contentContainerStyle={styles.lista}
        />
        <TouchableOpacity style={styles.botaoVoltar} onPress={handleVoltar}>
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1, // O mapa ocupa 3/4 da tela
  },
  listaContainer: {
    flex: 2, // A lista ocupa 1/4 da tela
    backgroundColor: '#fff',
    padding: 16,
  },
  lista: {
    paddingBottom: 16,
  },
  caminhaoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  caminhaoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  caminhaoInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  botaoExcluir: {
    backgroundColor: '#dc3545',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  textoBotaoExcluir: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    backgroundColor: '#127702',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});