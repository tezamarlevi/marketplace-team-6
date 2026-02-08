import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 20,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000', 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  infoContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 18,
    color: '#000',
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#ffe4e6', 
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fca5a5', 
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default styles;