import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "../context/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// 1. Importe o SafeAreaView e o StatusBar
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from "react-native";

export default function Layout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <AuthProvider>
          {/* 2. Envolva todo o conteúdo com o SafeAreaView.
               Ele adiciona automaticamente o espaçamento necessário no topo e na base
               para evitar que o seu conteúdo fique por baixo da barra de status ou dos
               gestos de navegação do dispositivo.
          */}
          <SafeAreaView style={styles.container}>
            {/* 3. O componente StatusBar permite controlar a aparência da barra de status.
                 'style="dark"' deixa os ícones (relógio, bateria) escuros, ideal para fundos claros.
                 Pode mudar para "light" se o fundo do seu app for escuro.
            */}
            <StatusBar style="dark" />
            <Slot />
          </SafeAreaView>
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
