import React, { JSX, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../helpers/axios'; 
import { Button } from 'react-native-paper';
import { useAuth } from '../../context/auth'; 
// CORREÇÃO: Importando a interface correta para os dados que serão ENVIADOS.
import { UsageRecordGet } from '../../components/interfaces/usage-record';

// Define os tipos dos parâmetros esperados da rota
type LocalParams = {
  equipId: string;
  description: string;
  marca: string;
  signature: string;
  retiradoPor: string;
  localUso: string;
  observacoes: string;
};

export default function SaidaEquip(): JSX.Element {
  const { user } = useAuth(); 
  const router = useRouter();
  
  const params = useLocalSearchParams<LocalParams>();

  const [retiradoPor, setRetiradoPor] = useState<string>(params.retiradoPor ?? '');
  const [activity, setActivity] = useState<string>(params.localUso ?? '');
  const [observacoes, setObservacoes] = useState<string>(params.observacoes ?? '');
  const [assinatura, setAssinatura] = useState<string>(params.signature ?? '');
  
  const [dataHoraRetirada] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    // A validação de campos no frontend está correta.
    if (!retiradoPor.trim() || !activity.trim() || !assinatura || !user?._id || !params.equipId) {
      Alert.alert('Atenção', 'Todos os campos, incluindo a assinatura, são obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      // CORREÇÃO: O payload agora é tipado com a interface correta "UsageRecordGet".
      const payload: UsageRecordGet = {
        equipmentId: params.equipId,
        userId: user._id,
        description: params.description || '',
        marca: params.marca || '',
        activity: activity.trim(),
        startTime: dataHoraRetirada.toISOString(),
        assinatura: assinatura,
        observacoes: observacoes.trim(),
        retiradoPor: retiradoPor.trim(),
        totalHours: 0,
        endTime: null, 
      };
      
      // A lógica de duas etapas (criar uso e atualizar status) está correta.
      await api.post(`/usage`, payload);
      await api.patch(`/equipment/${params.equipId}/status`, { status: 'emprestado' });

      Alert.alert('Sucesso!', 'Saída de equipamento registrada e status do item atualizado!');
      
      router.push('/home_pages/registrar_uso_equip'); 

    } catch (error) {
      console.error('Erro detalhado ao registrar saída:', JSON.stringify(error, null, 2));
      const errorMessage = (error as any).response?.data?.error || 'Não foi possível concluir a operação.';
      Alert.alert('Erro na Solicitação', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSignature = () => {
    router.push({
      pathname: '/tela_assinatura/SignatureScreen',
      params: {
        equipId: params.equipId,
        description: params.description,
        marca: params.marca,
        retiradoPor: retiradoPor, 
        localUso: activity,
        observacoes: observacoes,
        returnTo: '/actions/saida_equip',
      },
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={localStyles.container}>
        <View style={localStyles.card}>
          <Text style={localStyles.title}>Saída de Equipamento</Text>
          
          <Text style={localStyles.label}>ID do Equipamento:</Text>
          <Text style={localStyles.value}>{params.equipId}</Text>

          <Text style={localStyles.label}>Tipo do equipamento:</Text>
          <Text style={localStyles.value}>{params.description}</Text>

          <Text style={localStyles.label}>Marca:</Text>
          <Text style={localStyles.value}>{params.marca}</Text>

          <Text style={localStyles.label}>Nome de quem está retirando:</Text>
          <TextInput
            style={localStyles.input}
            value={retiradoPor}
            onChangeText={setRetiradoPor}
            placeholder="Digite o nome"
            placeholderTextColor="#888"
          />

          <Text style={localStyles.label}>Atividade / Local de Uso:</Text>
          <TextInput
            style={localStyles.input}
            value={activity}
            onChangeText={setActivity}
            placeholder="Ex: Manutenção na Linha 5"
            placeholderTextColor="#888"
          />
          
          <Text style={localStyles.label}>Data e Hora de Retirada:</Text>
          <Text style={localStyles.value}>
            {dataHoraRetirada.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
          </Text>

          <Text style={localStyles.label}>Observações:</Text>
          <TextInput
            style={[localStyles.input, { height: 80, textAlignVertical: 'top' }]}
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Adicione observações (opcional)"
            placeholderTextColor="#888"
            multiline
          />

          <Text style={localStyles.label}>Assinatura:</Text>
          {assinatura ? (
            <Image
              source={{ uri: assinatura }}
              style={localStyles.signatureImage}
            />
          ) : (
            <Button
              mode="outlined"
              icon="draw"
              onPress={handleOpenSignature}
              style={{marginTop: 5}}
            >
              Coletar Assinatura
            </Button>
          )}

          {loading && <ActivityIndicator size="large" color="#007B83" style={{ marginVertical: 20 }} />}

          <View style={localStyles.buttonContainer}>
            <Button
              mode="outlined"
              style={[localStyles.button, {borderColor: '#888'}]}
              labelStyle={{ color: '#333' }}
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
              icon="arrow-right-bold-outline"
            >
              Confirmar Saída
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f4f4f4',
      padding: 16,
      justifyContent: 'center',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      color: '#555',
      marginTop: 12,
      fontWeight: '600',
      marginBottom: 4,
    },
    value: {
      fontSize: 18,
      color: '#000',
      marginBottom: 8,
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 8,
    },
    input: {
      fontSize: 18,
      color: '#000',
      backgroundColor: '#ffffff',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
      gap: 12,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
    },
    signatureImage: {
      width: '100%',
      height: 150,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginTop: 5,
    },
});
