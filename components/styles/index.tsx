import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");
const minSize = Math.min(width, height);

const styles = StyleSheet.create({
  // Containers e Layout
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  homeMenu: {
    marginTop: 40,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.6,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  consEquipMenu: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.5,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    elevation: 2,
  },
  profileBox: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFFFFF", // Fundo branco para destacar
    borderWidth: 1,
    borderColor: "#B0BEC5", // Cinza claro para borda
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileDetails: {
    marginLeft: 15,
  },
  profileName: {
    color: "#2C3E50", // Cinza escuro
    fontSize: 18,
    fontWeight: "bold",
  },
  profileTeam: {
    color: "#546E7A", // Cinza médio
    fontSize: 16,
    marginTop: 5,
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: width,
    alignItems: "center",
  },
  pageTitleBox: {
    backgroundColor: "#FFFFFF",
    marginTop: height * 0.08,
    marginBottom: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#B0BEC5",
    borderWidth: 1,
  },
  pageContextBox: {
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
    padding: 10,
    borderColor: "#B0BEC5",
    borderWidth: 1,
  },

  // Estilos para a tabela
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#B0BEC5",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: 5,
    color: "#2C3E50",
    fontSize: 16,
  },

  // Imagens
  loginLogo: {
    width: minSize * 0.70,
    height: minSize * 0.70,
    alignSelf: "center",
    alignItems: "flex-start",
  },
  profileImage: {
    width: minSize * 0.2,
    height: minSize * 0.2,
    borderRadius: minSize * 0.1,
  },

  // Labels e Texto
  loginLabel: {
    marginTop: 20,
    color: "#2C3E50",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileLabel: {
    marginTop: 5,
    color: "#2C3E50",
    fontSize: 16,
  },
  pageTitleLabel: {
    textAlign: "center",
    margin: 2,
    color: "#2C3E50",
    fontSize: 28,
    fontWeight: "bold",
  },

  // Campos de Texto e Input
  loginInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    color: "#2C3E50",
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    width: "70%",
    borderColor: "#B0BEC5",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    color: "#2C3E50",
    fontSize: 16,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  // Botões
  loginButton: {
    marginTop: 20,
    backgroundColor: "#FF6F00",
    alignSelf: "center",
    minWidth: minSize * 0.3,
    borderWidth: 1,
    borderColor: "#E65100",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
      homeButton: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E65100",
    backgroundColor: "#FF6F00",
    alignSelf: "center",
    justifyContent: "center",
    width: width * 0.85,
    height: height * 0.07,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  searchButton: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E65100",
    backgroundColor: "#FF6F00",
    alignSelf: "flex-start",
    justifyContent: "center",
    width: width * 0.3,
    height: height * 0.07,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  // Botões de ação
  actionButton: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007B83",
    backgroundColor: "#00ACC1",
    alignSelf: "center",
    justifyContent: "center",
    width: width * 0.4,
    height: height * 0.06,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Mensagens de erro
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },

  // Mensagens de sucesso
  successText: {
    color: "#388E3C",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },

  // Placeholder para listas vazias
  emptyListText: {
    color: "#B0BEC5",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },

  // Divisores
  divider: {
    height: 1,
    backgroundColor: "#B0BEC5",
    marginVertical: 10,
    width: "100%",
  },

  // Ícones
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6F00",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    color: "#FFFFFF",
    fontSize: 20,
  },

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#546E7A",
    textAlign: "center",
    marginBottom: 20,
  },

  // Cards
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#B0BEC5",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#546E7A",
  },

  // Botão flutuante
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF6F00",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonIcon: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50", // Cinza escuro para contraste
    marginBottom: 5,
    marginLeft: 5, // Espaçamento para alinhamento com o campo de entrada
  },
  cancelButton: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B0BEC5", // Cinza claro para borda
    backgroundColor: "#FFFFFF", // Fundo branco
    alignSelf: "center",
    justifyContent: "center",
    width: "70%",
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButtonText: {
    color: "#2C3E50", // Cinza escuro para o texto
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
