import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import CodeScanner from "../../commons/codeScanner";
import SettingsModal from "../../commons/settingsModal";
import Loader from "../../commons/loader";
import { styles } from "./HomeComponent.styles";
// import moment from 'moment';

export default class HomeComponent extends Component {

    state = {
        scannerVisible: false,
        settingsVisible: false,
        loader: false,
    };

    handleModalVisible = modalName => {
        this.setState({ [modalName]: !this.state[modalName] });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.loader && <Loader />}
                <Text style={styles.welcome}>Shambala Shop Assistant</Text>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => this.handleModalVisible("settingsVisible")}
                >
                    <Text>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => this.handleModalVisible("scannerVisible")}
                >
                    <Text>Open Scanner</Text>
                </TouchableOpacity>
                {this.state.scannerVisible &&
                    <CodeScanner
                        visible={this.state.scannerVisible}
                        handleScannerVisible={this.handleModalVisible}
                    />
                }
                {this.state.settingsVisible &&
                    <SettingsModal
                        visible={this.state.settingsVisible}
                        handleScannerVisible={this.handleModalVisible}
                    />
                }
            </View>
        );
    }
}
