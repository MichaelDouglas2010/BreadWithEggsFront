import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/auth';
import styles from '../components/styles';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import ProfileImage from '../components/handle-images/profile-image';
import ChatScreen from './chat_boot'; // Importe o componente de chat

export default function Home() {
  const { user } = useAuth();
  const [isChatVisible, setChatVisible] = useState(false); // Estado para controlar a visibilidade do chat

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <ProfileImage />
        <View>
          <Text style={styles.profileLabel}>{user.name}</Text>
          <Text style={styles.profileLabel}>{user.team}</Text>
        </View>
      </View>
      <ScrollView style={styles.homeMenu}>
        <View style={{ marginBottom: 15 }} />

        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/consultar_equip')}>
          Consultar Equipamento
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/entrada_saida_equip')}>
          Registrar Uso de Equipamento
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/selec_equip')}>
          Gerenciar Equipamentos
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/relatorio')}>
          Relatórios
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/camera')}>
          Camera
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/about')}>
          Sobre
        </Button>
      </ScrollView>

      {/* Botão flutuante para abrir o chat */}
      <TouchableOpacity
        style={floatingStyles.chatButton}
        onPress={() => setChatVisible(true)}
      >
        <Text style={floatingStyles.chatButtonText}>💬</Text>
      </TouchableOpacity>

      {/* Modal para exibir o chat */}
      <Modal
        visible={isChatVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setChatVisible(false)}
      >
        <View style={floatingStyles.modalContainer}>
          <ChatScreen />
          <Button
            mode="contained"
            style={floatingStyles.closeButton}
            onPress={() => setChatVisible(false)}
          >
            Fechar
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const floatingStyles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'flex-end',
  },
  closeButton: {
    marginTop: 10,
  },
});