import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/auth';
import styles from '../components/styles';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import ProfileImage from '../components/handle-images/profile-image';
import ChatScreen from '../components/chatboot/chat_boot'; 

export default function Home() {
  const { user } = useAuth();
  const [isChatVisible, setChatVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <ProfileImage />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileTeam}>{user.team}</Text>
        </View>
      </View>
      <ScrollView style={styles.homeMenu}>
        <View style={{ marginBottom: 15 }} />

        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/home_pages/consultar_equip')}>
          Consultar Equipamento
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/home_pages/registrar_uso_equip')}>
          Registrar Uso de Equipamento
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/home_pages/gerenciar_equip')}>
          Gerenciar Equipamentos
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/home_pages/relatorio')}>
          Relatórios
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/home_pages/camera')}>
          Camera
        </Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/home_pages/about')}>
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
    backgroundColor: '#007B83', // Ciano mais escuro para contraste
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 2,
    borderColor: '#005F63', // Azul escuro para borda
  },
  chatButtonText: {
    color: '#F1FAEE', // Branco pastel para contraste
    fontSize: 24,
    fontWeight: 'bold', // Negrito para maior visibilidade
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#E8F0F2', // Fundo cinza claro pastel
    padding: 10,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#A8DADC', // Ciano pastel para borda
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007B83', // Ciano mais escuro para contraste
    borderWidth: 2,
    borderColor: '#005F63', // Azul escuro para borda
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});