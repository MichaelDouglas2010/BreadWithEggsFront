import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import User from '../components/interfaces/user'; // Verifique se o caminho da sua interface está correto
import api from '../helpers/axios';
import axios from 'axios'; // Importe o axios para verificar o tipo do erro

// Interface para definir a estrutura do contexto de autenticação
interface IAuthContext {
  user: User | null;
  signIn: (credentials: Pick<User, 'email' | 'password'>) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

// Interface para as props do provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Função de Login Segura e com Depuração Melhorada
  async function signIn(credentials: Pick<User, 'email' | 'password'>) {
    setIsLoading(true);
    try {
      if (!credentials.email || !credentials.password) {
        Alert.alert('Atenção', 'Por favor, insira e-mail e senha.');
        setIsLoading(false);
        return;
      }
      
      // LOG DE DEPURAÇÃO: Mostra exatamente o que está a ser enviado
      console.log(`--- TENTANDO LOGIN ---`);
      console.log(`E-mail enviado: ${credentials.email}`);

      const response = await api.post('/user/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const loggedInUser = response.data.user;
      
      if (loggedInUser) {
        console.log("✅ Login bem-sucedido. Utilizador:", loggedInUser.name);
        setUser(loggedInUser);
        router.replace('/home');
      } else {
        throw new Error('Dados do utilizador não retornados pela API.');
      }

    } catch (error) {
      // Bloco de erro melhorado para depuração
      console.error("### ERRO DE LOGIN DETALHADO ###", JSON.stringify(error, null, 2));
      if (axios.isAxiosError(error) && error.response) {
          // Se o servidor enviou uma resposta de erro (ex: 401, 404, 500)
          console.error("DADOS DA RESPOSTA DO SERVIDOR:", error.response.data);
          const errorMessage = error.response.data.error || 'E-mail ou senha inválidos.';
          Alert.alert('Erro de Login', errorMessage);
      } else {
          // Erro de rede ou outro problema (ex: servidor offline)
          console.error("ERRO DE REDE OU AXIOS:", (error as Error).message);
          Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Função de Logout
  function signOut() {
    setUser(null);
    router.replace('/');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}
