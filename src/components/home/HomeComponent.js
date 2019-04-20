import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import CodeScanner from "../../commons/codeScanner";
import SettingsModal from "../../commons/settingsModal";
import Loader from "../../commons/loader";
import Storage from "../../helpers/storage";
import { styles } from "./HomeComponent.styles";
// import moment from 'moment';

const FILE_URL = "https://s3.eu-central-1.amazonaws.com/shurokphoto/catalog.txt";

export default class HomeComponent extends Component {

    state = {
        scannerVisible: false,
        settingsVisible: false,
        loader: false,
    };

    componentDidMount() {
        this.downloadFile();
    }

    downloadFile = () => {
        fetch(FILE_URL)
            .then(function(response) {
                // console.log(response.headers.map);
                if (!response.ok && response.status !== 200){
                    Alert.alert(
                        "Something wrong",
                        "File by this url: \n" +
                        FILE_URL + "\n" +
                        "not found! \n",
                        [
                            { text: "OK", onPress: () => false },
                        ],
                        { cancelable: true },
                    );
                    return false;
                }
                return response.json();
            })
            .then(function(myJson) {
                Storage.setFileData(JSON.stringify(myJson));
                // console.log(myJson);
            })
            .catch(function (error) {
                // console.log(error);
            });

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
