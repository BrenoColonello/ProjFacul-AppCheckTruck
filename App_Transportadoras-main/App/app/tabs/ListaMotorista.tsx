import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import motoristaService from '@/services/motoristaService';
import { Motorista } from '@/interfaces/motorista';

// Define the Motorista interface
// interface Motorista {
//   id: string;
//   nome: string;
//   dataContratacao: string;
//   cnh: string;
// }

const ListaMotoristaCadastrado = () => {
  const navigation = useNavigation();
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  // Função para carregar os motoristas do AsyncStorage
  const carregarMotoristas = async () => {
    const res = await motoristaService.getAll("")
    if (res.status == 200) {
      setMotoristas(res.data);
      
    }
    // try {
    //   const motoristasSalvos = await AsyncStorage.getItem('motoristas');
    //   if (motoristasSalvos) {
    //     setMotoristas(JSON.parse(motoristasSalvos));
    //   }
    // } catch (error) {
    //   console.error('Erro ao carregar motoristas:', error);
    // }
  };

  // Função para salvar os motoristas no AsyncStorage
  const salvarMotoristas = async (novosMotoristas: Motorista[]) => {
    // try {
    //   await AsyncStorage.setItem('motoristas', JSON.stringify(novosMotoristas));
    // } catch (error) {
    //   console.error('Erro ao salvar motoristas:', error);
    // }
  };

  // Função para excluir um motorista
  const excluirMotorista = async (id: number) => {
    Alert.alert(
      'Excluir Motorista',
      'Tem certeza de que deseja excluir este motorista?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const res = await motoristaService.delete("", id);
            if (res.status == 200) {
              Alert.alert("Sucesso", "Motorista excluído com sucesso.");
              carregarMotoristas(); // Recarrega a lista após a exclusão
            } else {
              Alert.alert("Erro", "Erro ao excluir motorista.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Carrega os motoristas ao abrir a tela
  useEffect(() => {
    carregarMotoristas();
  }, []);

  const renderMotorista = ({ item }: { item: Motorista }) => (
    <View style={styles.motoristaContainer}>
      <Text style={styles.motoristaNome}>Nome: {item.nome}</Text>
      <Text style={styles.motoristaInfo}>Data de Contratação: {item.dataContratacao.toString()}</Text>
      <Text style={styles.motoristaInfo}>CNH: {item.cnh}</Text>
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoDespesas}
          onPress={() => navigation.navigate('ListaDespesas', { motoristaId: item.id, motoristaNome: item.nome })}
        >
          <Text style={styles.textoBotaoDespesas}>Ver Despesas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => excluirMotorista(item.id)}
        >
          <Text style={styles.textoBotaoExcluir}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleVoltar = () => {
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Motoristas Cadastrados</Text>
      <FlatList
        data={motoristas}
        keyExtractor={(item) => item.id}
        renderItem={renderMotorista}
        contentContainerStyle={styles.lista}
      />
      <TouchableOpacity style={styles.botaoVoltar} onPress={handleVoltar}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  lista: {
    paddingBottom: 16,
  },
  motoristaContainer: {
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
  motoristaNome: {
    fontSize: 16,
    color: '#333',
  },
  motoristaInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoDespesas: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  textoBotaoDespesas: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  botaoExcluir: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  textoBotaoExcluir: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  botaoVoltar: {
    backgroundColor: '#127702',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ListaMotoristaCadastrado;