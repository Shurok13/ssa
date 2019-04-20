import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 25,
    },
    scanButton: {
        position: "absolute",
        bottom: 25,
        margin: 25,
        borderWidth: 0.5,
        padding: 15,
        borderRadius: 5,
    },
    settingsButton: {
        position: "absolute",
        top: 70,
        margin: 25,
        borderWidth: 0.5,
        padding: 15,
        borderRadius: 5,
    },
});
