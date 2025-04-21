import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../helpers/axios';

export default function SaidaEquip() {
  const router = useRouter();
  const { equipId, description, marca, signature, retiradoPor: returnedRetiradoPor, localUso: returnedLocalUso, observacoes: returnedObservacoes } = useLocalSearchParams(); // Recebe os dados enviados

  const [retiradoPor, setRetiradoPor] = useState(returnedRetiradoPor || '');
  const [localUso, setLocalUso] = useState(returnedLocalUso || '');
  const [observacoes, setObservacoes] = useState(returnedObservacoes || '');
  const [assinatura, setAssinatura] = useState(signature || ''); // Recebe a assinatura retornada
  const [dataHoraRetirada] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!retiradoPor || !assinatura || !localUso) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios e assine.');
      return;
    }

    setLoading(true);
    try {
      await api.post(`/saida`, {
        equipId,
        description,
        marca,
        dataSaida: dataHoraRetirada.toISOString(),
        retiradoPor,
        localUso,
        assinatura,
        status: "ativo",
        observacoes,
      });

      Alert.alert('Sucesso', 'Saída registrada com sucesso!');
      router.push('/entrada_saida_equip');
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
      Alert.alert('Erro', 'Não foi possível registrar a saída.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSignature = () => {
    router.push({
      pathname: '/tela_assinatura/SignatureScreen', // Caminho para a tela de assinatura
      params: {
        returnTo: '/actions/saida_equip',
        retiradoPor,
        localUso,
        observacoes,
        signature: assinatura, // Passa a assinatura atual
      }, // Passa os dados existentes
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Saída de Equipamento</Text>

        <Text style={styles.label}>ID do Equipamento:</Text>
        <Text style={styles.value}>{equipId}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{description}</Text>

        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.value}>{marca}</Text>

        <Text style={styles.label}>Nome de quem está retirando:</Text>
        <TextInput
          style={styles.input}
          value={retiradoPor}
          onChangeText={setRetiradoPor}
          placeholder="Digite o nome"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Local de Uso:</Text>
        <TextInput
          style={styles.input}
          value={localUso}
          onChangeText={setLocalUso}
          placeholder="Digite o local de uso"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Data e Hora de Retirada:</Text>
        <Text style={styles.value}>
          {dataHoraRetirada.toLocaleString()}
        </Text>

        <Text style={styles.label}>Observações:</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={observacoes}
          onChangeText={setObservacoes}
          placeholder="Adicione observações (opcional)"
          placeholderTextColor="#ccc"
          multiline
        />

        <Text style={styles.label}>Assinatura:</Text>
        {assinatura ? (
          <Image
            source={{ uri: assinatura }}
            style={styles.signatureImage}
          />
        ) : (
          <Button title="Abrir Assinatura" onPress={handleOpenSignature} />
        )}

        <Button title={loading ? "Enviando..." : "Confirmar Saída"} onPress={handleConfirm} disabled={loading} />
        <Button title="Cancelar" onPress={() => router.back()} color="#999" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#08475E',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  signatureImage: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});