import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: "red",
        backgroundColor:"black",
        fontFamily:"Papyrus",
        textAlign: "right",
        letterSpacing:-6,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        color: "yellow",
        fontFamily: "Comic Sans MS",
        fontSize: 8,
        
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        color: "white",
        
    },
    button: {
        backgroundColor: "yellow",
        padding: 0,
        marginTop: 20,
        borderRadius: 5,
        alignItems: "center",
        
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 8,
    },
    toggleContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",
    },
    toggleText: {
        color: "#90EE90",
        paddingLeft: 5,
    },
    error: {
        marginTop: 10,
        color: "red",
    },
    toggleTextWhite: {
        color: "white",
    },
    disabledButton: {
        backgroundColor: "gray",
        color: "white",
    },
});

export default styles;