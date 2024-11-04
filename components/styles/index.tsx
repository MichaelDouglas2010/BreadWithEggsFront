import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");
const minSize = Math.min(width, height);

const styles = StyleSheet.create({
  // Containers e Layout
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#155F82",
    padding: 20,
  },
  homeMenu: {
    marginTop: 40,
    borderRadius: 15,
    backgroundColor: "#104861",
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.6,
    borderWidth: 2,
  },
  consEquipMenu: {
    marginTop: 10,
    backgroundColor: "#104861",
    alignSelf: "center",
    width: width * 0.9,
    height: height * 0.5,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileBox: {
    flexDirection: "row",
    marginBottom: 5,
    paddingBottom: 5,
    paddingTop: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: width,
    alignItems: "center",
  },
  pageTitleBox: {
    backgroundColor:"#104861",
    marginTop: height*0.08,
    marginBottom: 5,
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#53A9CF',
    borderWidth:2,
  },

  // Estilos para a tabela
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    color: 'white', // Defina a cor do texto conforme necessário
  },

  // Imagens
  loginLogo: {
    width: minSize * 0.5,
    height: minSize * 0.5,
    alignSelf: "center",
  },
  profileImage: {
    width: minSize * 0.2,
    height: minSize * 0.2,
  },

  // Labels e Texto
  loginLabel: {
    marginTop: 20,
    color: "white",
    fontSize: 15,
  },
  profileLabel: {
    marginTop: 5,
    color: "white",
    fontSize: 15,
  },
  pageTitleLabel: {
    textAlign: 'center',
    margin: 2,
    color: 'white',
    fontSize: 30,
  },

  // Campos de Texto e Input
  loginInput: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  searchInput: {
    height: 40,
    width: "70%",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  // Botões
  loginButton: {
    marginTop: 20,
    backgroundColor: "#104861",
    alignSelf: "center",
    minWidth: minSize * 0.3,
    borderWidth: 2,
    borderColor: "black",
  },
  homeButton: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#155F82",
    alignSelf: "center",
    justifyContent: "center",
    width: width * 0.85,
    height: height * 0.07,
  },
  searchButton: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#104861",
    alignSelf: "flex-start",
    justifyContent: "center",
    width: width * 0.30,
    height: height * 0.07,
    fontSize: 12,
  },
});

export default styles;
