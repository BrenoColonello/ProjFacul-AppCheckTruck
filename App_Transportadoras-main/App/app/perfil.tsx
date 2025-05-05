import React from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, View, Button, Text } from 'react-native';

export default function MyProfileScreen() {
  const handleRegister = () => {
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* Foto do perfil */}
        <Image
          source={require('@/assets/perfil.png')} // Substitua com a imagem do perfil
          style={styles.profileImage}
        />
        {/* Nome, CPF, Telefone, CNH */}
        <View style={styles.profileInfo}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="CNH"
            placeholderTextColor="#888"
          />
        <TouchableOpacity 
          style={styles.customButton} 
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
    
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  profileInfo: {
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  Button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 550,
    width: '80%',
    alignItems: 'center',
  },

  customButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
