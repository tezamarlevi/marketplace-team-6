import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#be123c', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#be123c',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default styles;