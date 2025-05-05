import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

interface Motorista {
    id: string;
    nome: string;
}

export default function CadastroCaminhao() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [placa, setPlaca] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [chassi, setChassi] = useState('');
  const [ultimasPecasTrocadas, setUltimasPecasTrocadas] = useState('');
  const [proximasPecasTrocar, setProximasPecasTrocar] = useState('');
  const [motoristas, setMotoristas] = useState([]); // Lista de motoristas
  const [motoristaSelecionado, setMotoristaSelecionado] = useState(''); // ID do motorista selecionado

  // Carrega os motoristas cadastrados do AsyncStorage
  const carregarMotoristas = async () => {
    // try {
      // const motoristasSalvos = await AsyncStorage.getItem('motoristas');
    //   if (motoristasSalvos) {
    //     setMotoristas(JSON.parse(motoristasSalvos));
    //   }
    // } catch (error) {
    //   console.error('Erro ao carregar motoristas:', error);
    // }
  };

  useEffect(() => {
    carregarMotoristas();
  }, []);

  const salvarCaminhao = async () => {
    if (!nome || !placa || !quilometragem || !chassi) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Cria o novo caminhão
      const novoCaminhao = {
        id: Date.now().toString(), // Gera um ID único
        nome,
        placa,
        quilometragem,
        chassi,
        ultimasPecasTrocadas: ultimasPecasTrocadas.split(',').map((peca) => peca.trim()),
        proximasPecasTrocar: proximasPecasTrocar.split(',').map((peca) => peca.trim()),
        motoristaId: motoristaSelecionado, // Associa o motorista selecionado
      };

      // Carrega os caminhões existentes do AsyncStorage
      // const caminhoesSalvos = await AsyncStorage.getItem('caminhoes');
      // const caminhoes = caminhoesSalvos ? JSON.parse(caminhoesSalvos) : [];

      // Adiciona o novo caminhão à lista
      // const caminhoesAtualizados = [...caminhoes, novoCaminhao];

      // Salva a lista atualizada no AsyncStorage
      // await AsyncStorage.setItem('caminhoes', JSON.stringify(caminhoesAtualizados));

      // Exibe um aviso de que o caminhão foi cadastrado
      Alert.alert('Sucesso', 'Caminhão cadastrado com sucesso!');

      // Limpa os campos após salvar
      setNome('');
      setPlaca('');
      setQuilometragem('');
      setChassi('');
      setUltimasPecasTrocadas('');
      setProximasPecasTrocar('');
      setMotoristaSelecionado('');
    } catch (error) {
      console.error('Erro ao salvar caminhão:', error);
      Alert.alert('Erro', 'Não foi possível salvar o caminhão.');
    }
  };

  const handleVoltar = () => {
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Caminhão</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Caminhão"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Quilometragem"
        value={quilometragem}
        onChangeText={setQuilometragem}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Chassi"
        value={chassi}
        onChangeText={setChassi}
      />
      <TextInput
        style={styles.input}
        placeholder="Últimas Peças Trocadas (separadas por vírgula)"
        value={ultimasPecasTrocadas}
        onChangeText={setUltimasPecasTrocadas}
      />
      <TextInput
        style={styles.input}
        placeholder="Próximas Peças a Trocar (separadas por vírgula)"
        value={proximasPecasTrocar}
        onChangeText={setProximasPecasTrocar}
      />
      <Text style={styles.label}>Selecione o Motorista</Text>
      <Picker
        selectedValue={motoristaSelecionado}
        onValueChange={(itemValue) => setMotoristaSelecionado(itemValue)}
        style={styles.picker}
      >
        {/* <Picker.Item label="Selecione um motorista" value="" />
        {motoristas.map((motorista) => (
          <Picker.Item key={motorista.id} label={motorista.nome} value={motorista.id} />
        ))} */}
      </Picker>
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCaminhao}>
        <Text style={styles.textoBotaoSalvar}>Salvar Caminhão</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoVoltar} onPress={handleVoltar}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    backgroundColor: '#fff',
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