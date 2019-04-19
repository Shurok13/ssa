import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: "column",
    },
    topComponent: {
        flex: 0.25,
        flexDirection: "row",
        padding: 5,
    },
    cameraComponent: {
        flex: 0.5,
    },
    bottomComponent: {
        flex: 0.25,
        flexDirection: "row",
    },
    centerText: {
        position: "absolute",
        top: 20,
        left: 100,
        right: 100,
        zIndex: 100,
        fontSize: 18,
        padding: 0,
        color: "#777",
    },
    textBold: {
        fontWeight: "500",
        color: "#000",
    },
    buttonText: {
        fontSize: 21,
        color: "rgb(0,122,255)",
    },
    buttonTouchable: {
        padding: 5,
        position: "absolute",
        bottom: 15,
        left: 150,
        right: 150,
        zIndex: 100,
    },
    closeButton: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 100,
        padding: 5,
    },
});
