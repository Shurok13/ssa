import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import CodeScanner from "../../commons/codeScanner";
import Loader from "../../commons/loader";
import Storage from "../../helpers/storage";
import { styles } from "./HomeComponent.styles";
// import moment from 'moment';

const FILE_URL = "https://s3.eu-central-1.amazonaws.com/shurokphoto/catalog.txt";

export default class HomeComponent extends Component {

    state = {
        scannerVisible: false,
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

    handleScannerVisible = () => {
        this.setState({ scannerVisible: !this.state.scannerVisible });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.loader && <Loader />}
                <Text style={styles.welcome}>Welcome to Shambala Shop Assistant</Text>
                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => {this.handleScannerVisible();}}
                >
                    <Text>Open Scanner</Text>
                </TouchableOpacity>
                <CodeScanner
                    visible={this.state.scannerVisible}
                    handleScannerVisible={this.handleScannerVisible}
                />
            </View>
        );
    }
}
