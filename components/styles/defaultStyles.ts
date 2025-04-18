import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Fundo claro, mas confortável para os olhos
    padding: 20,
  },
  pageTitleBox: {
    marginBottom: 20,
    alignItems: 'center',
  },
  pageTitleLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // Texto escuro para contraste
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555', // Texto com contraste adequado
  },
  searchInput: {
    backgroundColor: '#FFFFFF', // Fundo branco para contraste
    borderColor: '#CCCCCC', // Borda cinza clara
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333333', // Texto escuro
  },
  searchButton: {
    backgroundColor: '#007B83', // Cor principal do botão
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF', // Texto branco para contraste
    fontSize: 16,
    fontWeight: '600',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
  consEquipMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  qrCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007B83',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  qrCodeIcon: {
    marginLeft: 5,
    color: '#FFFFFF',
  },
  activityIndicator: {
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#007B83',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default defaultStyles;