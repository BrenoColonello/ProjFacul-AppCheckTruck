import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Veiculo } from '@/interfaces/veiculo';
import veiculoService from '@/services/veiculoService';
import { Motorista } from '@/interfaces/motorista';

// Define the Caminhao interface
// interface Caminhao {
//   id: string;
//   nome: string;
//   placa: string;
//   quilometragem: string;
//   chassi: string;
//   ultimasPecasTrocadas: string[];
//   proximasPecasTrocar: string[];
//   motoristaId: string; // ID do motorista associado
// }

// Define the Motorista interface
// interface Motorista {
//   id: string;
//   nome: string;
// }

const ListaCaminhao = () => {
  const navigation = useNavigation();
  const [caminhoes, setCaminhoes] = useState<Veiculo[]>([]);
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  // Função para carregar os caminhões do AsyncStorage
  const carregarCaminhoes = async () => {
    const res = await veiculoService.getAll("")

    if (res.status == 200) {
      setCaminhoes(res.data);
    }
  };

  // Função para carregar os motoristas do AsyncStorage
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

  // Função para excluir um caminhão
  const excluirCaminhao = async (id: number) => {
    Alert.alert(
      'Excluir Caminhão',
      'Tem certeza de que deseja excluir este caminhão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const res = await veiculoService.delete("" , id)
            if (res.status == 200) {
              carregarCaminhoes();
            }else{
              Alert.alert("Erro", "Erro ao excluir caminhão.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Carrega os caminhões e motoristas ao abrir a tela
  useEffect(() => {
    carregarCaminhoes();
    carregarMotoristas();
  }, []);

  // Função para obter o nome do motorista associado ao caminhão
  const obterNomeMotorista = (motoristaId: number) => {
    const motorista = motoristas.find((m) => m.id === motoristaId);
    return motorista ? motorista.nome : 'Não atribuído';
  };

  const renderCaminhao = ({ item }: { item: Veiculo }) => (
    <View style={styles.caminhaoContainer}>
      {/* <Text style={styles.caminhaoNome}>Nome: {item.nome}</Text> */}
      <Text style={styles.caminhaoInfo}>Placa: {item.placa}</Text>
      <Text style={styles.caminhaoInfo}>Quilometragem: {item.quilometragem}</Text>
      <Text style={styles.caminhaoInfo}>Chassi: {item.chassi}</Text>
      {/* <Text style={styles.caminhaoInfo}>Últimas Peças Trocadas: {item.ultimasPecasTrocadas.join(', ') || 'Nenhuma'}</Text> */}
      {/* <Text style={styles.caminhaoInfo}>Próximas Peças a Trocar: {item.proximasPecasTrocar.join(', ') || 'Nenhuma'}</Text> */}
      {/* <Text style={styles.caminhaoInfo}>Motorista: {obterNomeMotorista(item.motoristaId)}</Text> */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => excluirCaminhao(item.id)}
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
      <Text style={styles.titulo}>Caminhões Cadastrados</Text>
      <FlatList
        data={caminhoes}
        keyExtractor={(v) => v.id.toString()}
        renderItem={renderCaminhao}
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
    color: '#333',
  },
  caminhaoInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoExcluir: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
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

export default ListaCaminhao;