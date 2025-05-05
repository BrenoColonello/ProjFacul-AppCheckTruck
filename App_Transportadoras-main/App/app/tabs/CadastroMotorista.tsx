import  { useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CadastroMotorista() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [dataContratacao, setDataContratacao] = useState('');
  const [cnh, setCnh] = useState('');

  const salvarMotorista = async () => {
    if (!nome || !dataContratacao || !cnh) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Cria o novo motorista
      const novoMotorista = {
        id: Date.now().toString(), // Gera um ID único
        nome,
        dataContratacao,
        cnh,
      };

      // Carrega os motoristas existentes do AsyncStorage
      // const motoristasSalvos = await AsyncStorage.getItem('motoristas');
      // const motoristas = motoristasSalvos ? JSON.parse(motoristasSalvos) : [];

      // Adiciona o novo motorista à lista
      // const motoristasAtualizados = [...motoristas, novoMotorista];

      // Salva a lista atualizada no AsyncStorage
      // await AsyncStorage.setItem('motoristas', JSON.stringify(motoristasAtualizados));

      // Exibe um aviso de que o motorista foi cadastrado
      Alert.alert('Sucesso', 'Motorista cadastrado com sucesso!');

      // Limpa os campos após salvar
      setNome('');
      setDataContratacao('');
      setCnh('');
    } catch (error) {
      console.error('Erro ao salvar motorista:', error);
      Alert.alert('Erro', 'Não foi possível salvar o motorista.');
    }
  };

  const handleVoltar = () => {
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Motorista</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Motorista"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Contratação (DD/MM/AAAA)"
        value={dataContratacao}
        onChangeText={setDataContratacao}
      />
      <TextInput
        style={styles.input}
        placeholder="CNH"
        value={cnh}
        onChangeText={setCnh}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarMotorista}>
        <Text style={styles.textoBotaoSalvar}>Salvar Motorista</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoVoltar} onPress={handleVoltar}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  botaoSalvar: {
    backgroundColor: '#127702',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    backgroundColor: '#127702',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});