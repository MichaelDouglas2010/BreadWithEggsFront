import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/auth';
import styles from '../components/styles';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import ProfileImage from '../components/handle-images/profile-image';
import ChatScreen from '../components/chatboot/chat_boot';

export default function Home() {
  const { user, signOut } = useAuth(); // <-- agora usando signOut
  const [isChatVisible, setChatVisible] = useState(false);

  // Função para sair da conta
  const handleSignOut = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            if (signOut) signOut(); // faz logout
            router.replace('/'); // volta para tela de login
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho do usuário */}
      <View style={styles.profileBox}>
        <ProfileImage />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName} accessibilityRole="header">{user.name}</Text>
          <Text style={styles.profileTeam}>{user.team}</Text>
        </View>
      </View>

      {/* Menu principal */}
      <ScrollView style={styles.homeMenu} contentContainerStyle={{ paddingVertical: 20 }}>
        <Text style={localStyles.sectionTitle}>Menu Principal</Text>
        <Button
          mode="contained"
          style={styles.homeButton}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/consultar_equip')}
          accessibilityLabel="Consultar Equipamento"
        >
          Consultar Equipamento
        </Button>
        <Button
          mode="contained"
          style={styles.homeButton}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/registrar_uso_equip')}
          accessibilityLabel="Registrar Uso de Equipamento"
        >
          Registrar Uso de Equipamento
        </Button>
        <Button
          mode="contained"
          style={styles.homeButton}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/gerenciar_equip')}
          accessibilityLabel="Gerenciar Equipamentos"
        >
          Gerenciar Equipamentos
        </Button>
        <Button
          mode="contained"
          style={styles.homeButton}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/relatorio')}
          accessibilityLabel="Relatórios"
        >
          Relatórios
        </Button>
        <Button
          mode="contained"
          style={styles.homeButton}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/camera')}
          accessibilityLabel="Câmera"
        >
          Câmera
        </Button>
        <Button
          mode="contained"
          style={styles.homeButton}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/about')}
          accessibilityLabel="Sobre"
        >
          Sobre
        </Button>
        <Button
          mode="contained"
          style={localStyles.signOutButton}
          labelStyle={localStyles.signOutLabel}
          onPress={handleSignOut}
          accessibilityLabel="Sair da conta"
        >
          Sair da Conta
        </Button>
      </ScrollView>

      {/* Botão flutuante para abrir o chat */}
      <TouchableOpacity
        style={floatingStyles.chatButton}
        onPress={() => setChatVisible(true)}
        accessibilityLabel="Abrir chat de suporte"
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
            accessibilityLabel="Fechar chat"
          >
            Fechar
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    marginLeft: 5,
    textAlign: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.2,
  },
  signOutButton: {
    marginTop: 18,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '85%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  signOutLabel: {
    color: '#FF6F00',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
});

const floatingStyles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007B83',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 2,
    borderColor: '#005F63',
  },
  chatButtonText: {
    color: '#F1FAEE',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#E8F0F2',
    padding: 10,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#A8DADC',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007B83',
    borderWidth: 2,
    borderColor: '#005F63',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

