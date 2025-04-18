import { StyleSheet } from 'react-native';

const tableStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#B0BEC5',
    paddingBottom: 8,
    marginBottom: 6,
  },
  headerText: {
    color: '#2C3E50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cellStatus: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellInfo: {
    width: 200,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  cellAction: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 20,
  },
  equipName: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  equipBrand: {
    fontSize: 12,
    color: '#546E7A',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 20,
    color: 'white',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default tableStyles;