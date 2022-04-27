import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inter-regular',
    },
    linearGradient: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: '100%',
        width: '100%',
        padding: 20,
    },
    content:{
        marginBottom: 100,
        
    },
    logo:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 35,
        width: '100%',
        justifyContent: 'flex-start',
        right: 14,
    },
    logoText:{
        color: 'white',
        fontSize: 37,
        fontFamily: 'inter-bold',
        margin: 0,
        right: 14
    },
    mainText:{
        color: 'white',
        fontSize: 19,
        fontFamily: 'inter-regular',
    },
    buttons:{
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 100,
        height: 55,

    },
    button1: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        width: '45%',
    },
    button2: {
        backgroundColor: '#6D6D6D',
        padding: 15,
        borderRadius: 10,
        width: '45%',
    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderTopColor: 'white',
        borderLeftColor:'white',
        borderRightColor: 'white',
        borderBottomColor: '#a6a6a6',
        padding: 10,
    },
    button2Text: {
        color: '#007AFF',           
    }

})