import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { styles } from './CodeScanner.styles';


export default class CodeScanner extends Component {

    onSuccess(response) {
        // console.log(response.data);
        Alert.alert(
            "Scanned",
            response.data,
            [{ text: 'OK' }],
            { cancelable: true },
        );
    }

    handleRescan = () => {
        this.scanner.reactivate();
    };

    render() {
        const { visible, handleScannerVisible } = this.props;
        return (
            <Modal
                style={styles.modal}
                visible={visible}
                onRequestClose={() => handleScannerVisible()}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => handleScannerVisible()}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <QRCodeScanner
                    onRead={data => this.onSuccess(data)}
                    topContent={
                        <Text style={styles.centerText}>
                            Top Component
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity
                            style={styles.buttonTouchable}
                            onPress={() => this.handleRescan()}
                        >
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    }
                    fadeIn={false}
                    ref={(node) => { this.scanner = node }}
                    cameraProps={{
                        captureAudio: false,
                    }}
                    topViewStyle={styles.topComponent}
                    cameraStyle={styles.cameraComponent}
                    bottomViewStyle={styles.bottomComponent}
                />
            </Modal>
        );
    }
}
