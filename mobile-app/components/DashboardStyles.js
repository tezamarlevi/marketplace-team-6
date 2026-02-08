import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff', 
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15, 
        backgroundColor: '#fff', 
        borderBottomWidth: 1,   
        borderBottomColor: '#f3f4f6', 
        elevation: 2, 
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#f3f4f6', 
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    greeting: {
        fontSize: 12,
        color: '#6b7280',
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 15,
    },
    iconButton: {
        padding: 8,
        backgroundColor: '#f9fafb',
        borderRadius: 50,
    },

    section: {
        marginBottom: 25,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700', 
        marginBottom: 15,
        color: '#111827',
        letterSpacing: 0.3,
    },

    bannerContainer: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        elevation: 5,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    pagination: {
        position: 'absolute',
        bottom: 15,
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 24, 
    },

    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 55) / 2, 
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    cardImage: {
        width: '100%',
        height: 130,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#f9fafb',
    },
    cardContent: {
        alignItems: 'flex-start',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
        lineHeight: 20,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111827', 
    },
});

export default styles;