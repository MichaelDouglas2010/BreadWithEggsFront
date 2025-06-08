import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../helpers/axios';
import { Button } from 'react-native-paper';

export default function SaidaEquip() {
  const router = useRouter();
  const {
    equipId,
    description,
    marca,
    signature,
    retiradoPor: returnedRetiradoPor,
    localUso: returnedLocalUso,
    observacoes: returnedObservacoes,
  } = useLocalSearchParams();

  const [retiradoPor, setRetiradoPor] = useState(
    Array.isArray(returnedRetiradoPor) ? returnedRetiradoPor[0] ?? '' : returnedRetiradoPor ?? ''
  );
  const [localUso, setLocalUso] = useState(
    Array.isArray(returnedLocalUso) ? returnedLocalUso[0] ?? '' : returnedLocalUso ?? ''
  );
  const [observacoes, setObservacoes] = useState(
    Array.isArray(returnedObservacoes) ? returnedObservacoes[0] ?? '' : returnedObservacoes ?? ''
  );
  const [assinatura, setAssinatura] = useState(signature || '');
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
      pathname: '/tela_assinatura/SignatureScreen',
      params: {
        returnTo: '/actions/saida_equip',
        retiradoPor,
        localUso,
        observacoes,
        signature: assinatura,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={localStyles.container}>
      <View style={localStyles.card}>
        <Text style={localStyles.title}>Saída de Equipamento</Text>

        <Text style={localStyles.label}>ID do Equipamento:</Text>
        <Text style={localStyles.value}>{equipId}</Text>

        <Text style={localStyles.label}>Tipo do equipamento:</Text>
        <Text style={[localStyles.value, { color: '#000' }]}>{description}</Text>

        <Text style={localStyles.label}>Marca:</Text>
        <Text style={localStyles.value}>{marca}</Text>

        <Text style={localStyles.label}>Nome de quem está retirando:</Text>
        <TextInput
          style={localStyles.input}
          value={retiradoPor}
          onChangeText={setRetiradoPor}
          placeholder="Digite o nome"
          placeholderTextColor="#ccc"
        />

        <Text style={localStyles.label}>Local de Uso:</Text>
        <TextInput
          style={localStyles.input}
          value={localUso}
          onChangeText={setLocalUso}
          placeholder="Digite o local de uso"
          placeholderTextColor="#ccc"
        />

        <Text style={localStyles.label}>Data e Hora de Retirada:</Text>
        <Text style={localStyles.value}>
          {dataHoraRetirada.toLocaleString()}
        </Text>

        <Text style={localStyles.label}>Observações:</Text>
        <TextInput
          style={[localStyles.input, { height: 80 }]}
          value={observacoes}
          onChangeText={setObservacoes}
          placeholder="Adicione observações (opcional)"
          placeholderTextColor="#ccc"
          multiline
        />

        <Text style={localStyles.label}>Assinatura:</Text>
        {assinatura ? (
          <Image
            source={{ uri: Array.isArray(assinatura) ? assinatura[0] ?? '' : assinatura }}
            style={localStyles.signatureImage}
          />
        ) : (
          <Button
            mode="outlined"
            style={localStyles.button}
            onPress={handleOpenSignature}
          >
            Abrir Assinatura
          </Button>
        )}

        {loading && <ActivityIndicator size="large" color="#007B83" style={{ marginVertical: 10 }} />}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <Button
            mode="contained"
            style={[localStyles.button, { backgroundColor: '#ccc' }]}
            labelStyle={{ color: '#222' }}
            onPress={() => router.back()}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            style={[localStyles.button, { backgroundColor: '#007B83' }]}
            labelStyle={{ color: '#fff' }}
            onPress={handleConfirm}
            disabled={loading}
            loading={loading}
          >
            Confirmar Saída
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#111',
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    color: '#111',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 8,
  },
  signatureImage: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
  },
});