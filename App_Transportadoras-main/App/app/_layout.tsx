import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './index';
import MotoristaScreen from './Motorista';
import CaminhaoScreen from './Caminhao';
import RotaScreen from './Rota';
import ListaMotorista from './tabs/ListaMotorista'; // Tela secundária
import ListaCaminhao from  './tabs/ListaCaminhao'
import ListaDespesas from './tabs/ListaDespesas';
import CadastroMotorista from './tabs/CadastroMotorista'; // Tela secundária
import CadastroCaminhao from './tabs/CadastroCaminhao'; 


const Stack = createStackNavigator();

export type RootStackParamList = {
    Tabs: undefined; // Rota principal para as abas
    ListaDespesas: { motoristaId: string }; // Define o parâmetro motoristaId
};

const s = createStackNavigator<RootStackParamList>(); //para despesas

export default function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      { <Stack.Screen name="Inicio" component={HomeScreen} />}
      {  <Stack.Screen name="Motorista" component={MotoristaScreen} />}
      { <Stack.Screen name="Caminhao" component={CaminhaoScreen} />}
      { <Stack.Screen name="Rota" component={RotaScreen} />}
      
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      {<Stack.Screen name="ListaMotorista" component={ListaMotorista} />}
      {<Stack.Screen name="ListaCaminhao" component={ListaCaminhao} />}
      {<Stack.Screen name="ListaDespesas" component={ListaDespesas} />}
      {<Stack.Screen name='CadastroMotorista' component={CadastroMotorista} />}
      {<Stack.Screen name='CadastroCaminhao' component={CadastroCaminhao} />}
    </Stack.Navigator>
  );
}

function TabsNavigator() {
  const colorScheme = useColorScheme();

return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Motorista"
        options={{
          title: 'Motorista',
          tabBarIcon: ({ color }) => <MaterialIcons name="directions-car" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Caminhao"
        options={{
          title: 'Caminhao',
          tabBarIcon: ({ color }) => <MaterialIcons name="local-shipping" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Rota"
        options={{
          title: 'Rota',
          tabBarIcon: ({ color }) => <MaterialIcons name="map" size={28} color={color} />,
        }}
      />
    </Tabs>
 );
}

