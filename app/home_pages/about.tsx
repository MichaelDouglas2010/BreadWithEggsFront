import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text as RNText } from 'react-native';
import { useRouter } from 'expo-router';
// CORREÇÃO: Removido 'Title' e 'Paragraph', e importado 'Text' como 'PaperText' para evitar conflitos.
import { Button, Card, Avatar, Text as PaperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import api from '../../helpers/axios';

// A interface para os dados continua a mesma
interface AboutInfo {
  id: number;
  line: string;
}

export default function AboutScreen() {
  const router = useRouter();
  const [aboutLines, setAboutLines] = useState<AboutInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const response = await api.get('/about');
        setAboutLines(response.data);
      } catch (error) {
        console.error("Erro ao buscar informações 'Sobre':", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutInfo();
  }, []);

  return (
    <View style={localStyles.container}>
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        <View style={localStyles.header}>
          <Ionicons name="information-circle-outline" size={60} color="#FF6F00" />
          {/* ALTERAÇÃO: Substituindo <Title> e <Paragraph> */}
          <PaperText variant="headlineSmall" style={localStyles.headerTitle}>Sobre o Projeto</PaperText>
          <PaperText variant="bodyLarge" style={localStyles.headerSubtitle}>
            Conheça mais sobre a nossa ferramenta de gestão de equipamentos.
          </PaperText>
        </View>

        <Card style={localStyles.card}>
          <Card.Content>
            <PaperText variant="titleLarge" style={localStyles.cardTitle}>Nossa Missão</PaperText>
            <PaperText variant="bodyMedium" style={localStyles.paragraph}>
              Facilitar e otimizar o dia a dia na obra, com foco na organização, controlo e praticidade para equipas de construção civil. Oferecemos uma gestão de equipamentos eficiente e segura.
            </PaperText>
          </Card.Content>
        </Card>

        <Card style={localStyles.card}>
          <Card.Content>
            <PaperText variant="titleLarge" style={localStyles.cardTitle}>Desenvolvedores</PaperText>
            <View style={localStyles.developerItem}>
                <Avatar.Icon size={40} icon="account-hard-hat" style={{backgroundColor: '#FF6F00'}}/>
                <PaperText style={localStyles.developerName}>Michael Douglas</PaperText>
            </View>
            <View style={localStyles.developerItem}>
                <Avatar.Icon size={40} icon="account-hard-hat" style={{backgroundColor: '#FF6F00'}}/>
                <PaperText style={localStyles.developerName}>Diego Cruz</PaperText>
            </View>
          </Card.Content>
        </Card>

        {isLoading ? (
          <ActivityIndicator animating={true} color="#FF6F00" style={{marginTop: 20}} />
        ) : aboutLines.length > 0 ? (
          <Card style={localStyles.card}>
            <Card.Content>
                <PaperText variant="titleLarge" style={localStyles.cardTitle}>Informações Adicionais</PaperText>
                {aboutLines.map((item) => (
                    <PaperText key={item.id} variant="bodyMedium" style={localStyles.paragraph}>
                    {item.line}
                    </PaperText>
                ))}
            </Card.Content>
          </Card>
        ) : null}

      </ScrollView>

      <View style={localStyles.footer}>
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={localStyles.backButton}
          labelStyle={localStyles.backButtonLabel}
        >
          Voltar
        </Button>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  headerTitle: {
    // Estilos de fonte como fontSize e fontWeight agora são controlados pela prop 'variant'
    // Mantemos estilos de layout como cor e margem.
    color: '#333',
    marginTop: 12,
  },
  headerSubtitle: {
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    maxWidth: '85%',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
    backgroundColor: '#fff', // Adicionado para melhor contraste
  },
  cardTitle: {
    color: '#FF6F00',
    marginBottom: 8,
  },
  paragraph: {
    lineHeight: 24,
    color: '#444',
  },
  developerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  developerName: {
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {
    borderRadius: 8,
    borderColor: '#ccc',
  },
  backButtonLabel: {
    color: '#333',
    fontWeight: 'bold',
  }
});
