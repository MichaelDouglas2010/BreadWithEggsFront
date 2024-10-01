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
    width: "100%",
    alignItems: "center",
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
    backgroundColor: "#155F82",
    alignSelf: "flex-start",
    justifyContent: "center",
    width: width * 0.30,
    height: height * 0.05,
    fontSize: 4,
  },
});

export default styles;
