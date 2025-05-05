import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ListaDespesas = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { motoristaId, motoristaNome } = route.params; // Recebe o ID e o nome do motorista
    const [despesas, setDespesas] = useState([]);
    const [nomeDespesa, setNomeDespesa] = useState('');
    const [valorDespesa, setValorDespesa] = useState('');
    const [dataDespesa, setDataDespesa] = useState(''); // Novo estado para a data
    const [foto, setFoto] = useState(null);

    // Função para carregar as despesas do AsyncStorage
    const carregarDespesas = async () => {
        try {
            // const despesasSalvas = await AsyncStorage.getItem(`despesas_${motoristaId}`);
            // if (despesasSalvas) {
            //     setDespesas(JSON.parse(despesasSalvas));
            // }
        } catch (error) {
            console.error('Erro ao carregar despesas:', error);
        }
    };

    // Função para salvar as despesas no AsyncStorage
    const salvarDespesas = async (novasDespesas) => {
        // try {
        //     await AsyncStorage.setItem(`despesas_${motoristaId}`, JSON.stringify(novasDespesas));
        // } catch (error) {
        //     console.error('Erro ao salvar despesas:', error);
        // }
    };

    // Carrega as despesas ao abrir a tela
    useEffect(() => {
        carregarDespesas();
    }, []);

    const adicionarDespesa = async () => {
        if (!nomeDespesa || !valorDespesa || !dataDespesa) {
            alert('Por favor, preencha o nome, valor e data da despesa.');
            return;
        }

        const novaDespesa = {
            id: Date.now().toString(),
            nome: nomeDespesa,
            valor: parseFloat(valorDespesa),
            data: dataDespesa, // Adiciona a data à despesa
            foto: foto,
        };

        const despesasAtualizadas = [...despesas, novaDespesa];
        // setDespesas(despesasAtualizadas);
        await salvarDespesas(despesasAtualizadas); // Salva as despesas no AsyncStorage
        setNomeDespesa('');
        setValorDespesa('');
        setDataDespesa('');
        setFoto(null);
    };

    // const selecionarFoto = () => {
    //     launchImageLibrary(
    //         {
    //             mediaType: 'photo',
    //             quality: 1,
    //         },
    //         (response) => {
    //             if (response.didCancel) {
    //                 console.log('Seleção de imagem cancelada.');
    //             } else if (response.assets && response.assets.length > 0) {
    //                 setFoto(response.assets[0].uri);
    //             }
    //         }
    //     );
    // };

    const renderDespesa = ({ item }) => (
        <View style={styles.despesaContainer}>
            <Text style={styles.despesaNome}>Nome: {item.nome}</Text>
            <Text style={styles.despesaValor}>Valor: R$ {item.valor.toFixed(2)}</Text>
            <Text style={styles.despesaData}>Data: {item.data}</Text>
            {item.foto && <Image source={{ uri: item.foto }} style={styles.despesaFoto} />}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Despesas do Motorista: {motoristaNome}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome da Despesa"
                value={nomeDespesa}
                onChangeText={setNomeDespesa}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor da Despesa"
                value={valorDespesa}
                onChangeText={setValorDespesa}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Data da Despesa (DD/MM/AAAA)"
                value={dataDespesa}
                onChangeText={setDataDespesa}
            />
            {/* <TouchableOpacity style={styles.botaoFoto} onPress={selecionarFoto}>
                <Text style={styles.textoBotaoFoto}>{foto ? 'Foto Selecionada' : 'Adicionar Foto'}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarDespesa}>
                <Text style={styles.textoBotaoAdicionar}>Adicionar Despesa</Text>
            </TouchableOpacity>
            <FlatList
                data={despesas}
                keyExtractor={(item) => item.id}
                renderItem={renderDespesa}
                contentContainerStyle={styles.lista}
            />
            <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
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
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    botaoFoto: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    textoBotaoFoto: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    botaoAdicionar: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    textoBotaoAdicionar: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    lista: {
        paddingBottom: 16,
    },
    despesaContainer: {
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
    despesaNome: {
        fontSize: 16,
        color: '#333',
    },
    despesaValor: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    despesaData: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    despesaFoto: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 5,
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

export default ListaDespesas;