import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 21,
        color: "rgb(0,122,255)",
    },
    closeButton: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 100,
        padding: 5,
    },
    titleText: {
        fontSize: 20,
        textAlign: "center",
        margin: 25,
    },
    linkInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 25,
        marginBottom: 5,
        marginTop: 5,
        textAlignVertical: "top",
    },
    saveButton: {
        height: 40,
        margin: 25,
        marginTop: 5,
        textAlignVertical: "center",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "gray",
        alignItems: "center",
        padding: 10,
    },
    isEmpty: {
        opacity: 0.4,
    },
    linkText: {
        fontSize: 12,
        textAlign: "left",
        marginLeft: 25,
    },
});
