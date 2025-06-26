import React, { useState } from 'react';
import { 
  View, 
  FlatList, // ALTERAÇÃO: Usando FlatList em vez de ScrollView para a grelha
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  SafeAreaView 
} from 'react-native';
import { useAuth } from '../context/auth';
import { Button, Text as PaperText, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProfileImage from '../components/handle-images/profile-image';
import ChatScreen from '../components/chatboot/chat_boot';

// Estrutura de dados para os itens do menu, facilitando a manutenção
const menuItems = [
  { 
    title: 'Consultar', 
    icon: 'magnify', 
    route: '/home_pages/consultar_equip',
    accessibilityLabel: 'Consultar Equipamento'
  },
  { 
    title: 'Registrar Uso', 
    icon: 'swap-horizontal-bold', 
    route: '/home_pages/registrar_uso_equip',
    accessibilityLabel: 'Registrar Uso de Equipamento'
  },
  { 
    title: 'Registrar Manutenção', 
    icon: 'tools', 
    route: '/home_pages/register_maintenance',
    accessibilityLabel: 'Registrar Manutenção de Equipamento'
  },
  { 
    title: 'Gerenciar', 
    icon: 'cog-outline', 
    route: '/home_pages/gerenciar_equip',
    accessibilityLabel: 'Gerenciar Equipamentos'
  },
  { 
    title: 'Relatórios de Uso', 
    icon: 'chart-bar', 
    route: '/home_pages/relatorio',
    accessibilityLabel: 'Relatórios de Uso'
  },
  { 
    title: 'Relatórios de Manutenção', 
    icon: 'file-document-outline', 
    route: '/home_pages/maintenance',
    accessibilityLabel: 'Relatórios de Manutenções'
  },
  { 
    title: 'Sobre', 
    icon: 'information-outline', 
    route: '/home_pages/about',
    accessibilityLabel: 'Sobre o projeto'
  },
];

export default function Home() {
  const router = useRouter();
  const { user, signOut } = useAuth(); 
  const [isChatVisible, setChatVisible] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: signOut },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F00" />
      </View>
    );
  }

  // Componente que renderiza cada item do menu na FlatList
  const renderMenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={() => router.push(item.route)}
      accessibilityLabel={item.accessibilityLabel}
    >
      <Avatar.Icon size={48} icon={item.icon} style={styles.menuIcon} />
      <PaperText variant="labelMedium" style={styles.menuLabel} numberOfLines={2}>{item.title}</PaperText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho do utilizador com design melhorado */}
        <View style={styles.profileBox}>
          <ProfileImage />
          <View style={styles.profileDetails}>
            <PaperText variant="titleMedium" style={styles.profileName}>{user.name}</PaperText>
            <PaperText variant="bodySmall" style={styles.profileTeam}>{user.team}</PaperText>
          </View>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutIcon}>
              <Ionicons name="log-out-outline" size={28} color="#FF6F00" />
          </TouchableOpacity>
        </View>

        {/* Menu principal agora usa FlatList para uma grelha responsiva */}
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.title}
          numColumns={2} // CRÍTICO: Cria a grelha de duas colunas
          contentContainerStyle={styles.menuContainer}
          ListHeaderComponent={<PaperText variant="titleLarge" style={styles.sectionTitle}>Menu Principal</PaperText>}
        />
        
        {/* Botão flutuante para o chat */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => setChatVisible(true)}
          accessibilityLabel="Abrir chat de suporte"
        >
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Modal do chat */}
        <Modal
          visible={isChatVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setChatVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <ChatScreen />
                <Button
                    mode="outlined"
                    style={styles.closeButton}
                    onPress={() => setChatVisible(false)}
                >
                    Fechar
                </Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 20,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
  },
  profileTeam: {
    color: '#666',
  },
  signOutIcon: {
    padding: 8,
  },
  menuContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  // O menuGrid foi removido, pois a FlatList gere a grelha
  menuItem: {
    flex: 1, // Permite que os itens preencham o espaço da coluna
    margin: 8, // Espaçamento entre os itens
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  menuIcon: {
    backgroundColor: '#ffe0b2',
    marginBottom: 12,
  },
  menuLabel: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '600'
  },
  chatButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007B83',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
      height: '85%',
      backgroundColor: '#E8F0F2',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
  },
  closeButton: {
    marginTop: 16,
    borderColor: '#007B83',
  }
});
