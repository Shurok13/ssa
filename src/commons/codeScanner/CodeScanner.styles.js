import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
    },
    topComponent: {
        flex: 0.20,
        flexDirection: 'row',
    },
    cameraComponent: {
        flex: 0.65,
    },
    bottomComponent: {
        flex: 0.15,
        flexDirection: 'row',
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    closeButtonText: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 100,
    },
});