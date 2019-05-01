import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
} from "react-native";
import Storage from "../../helpers/storage";
import Loader from "../../commons/loader";
import { styles } from "./SettingsModal.styles";

const URL_LINK = "URL_LINK";

export default class SettingsModal extends Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        handleScannerVisible: PropTypes.func.isRequired,
    };

    state = {
        text: "",
        loader: false,
        link: "",
        hash: "-------",
    };

    componentDidMount() {
        this.getLink();
    }

    getHash = data => {
        const hash = JSON.stringify(data).split("").reduce(function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        this.setState({ hash: hash });
    };

    saveLink = async () => {
        this.setState({ loader: true, text: "" });
        const { text } = this.state;
        if (text.length > 0) {
            await Storage.setData(process.env.URL_LINK, text);
        }
        this.setState({ loader: false, link: text });
    };

    getLink = async () => {
        const link = await Storage.getData(URL_LINK, "false");
        if (!!link && link.length > 0){
            await this.setState({ link: link });
        }
    };

    downloadFile = () => {
        const that = this;
        fetch(that.state.link)
            .then(function(response) {
                // console.log(response.headers.map);
                if (!response.ok && response.status !== 200){
                    Alert.alert(
                        "Something wrong",
                        "File by this url: \n" +
                        that.state.link + "\n" +
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
                that.getHash(myJson);
                Storage.setFileData(JSON.stringify(myJson));
            })
            .catch(function (error) {
                // eslint-disable-next-line no-console
                console.log("error", error);
            });
    };

    render() {
        const { visible, handleScannerVisible } = this.props;
        const { link, hash } = this.state;
        const isEmpty = !this.state.text > 0;
        return (
            <Modal
                style={styles.modal}
                visible={visible}
                onRequestClose={() => handleScannerVisible("settingsVisible")}
                animationType="fade"
            >
                {this.state.loader && <Loader />}
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => handleScannerVisible("settingsVisible")}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <Text style={styles.titleText}>
                    Settings
                </Text>
                <TextInput
                    style={styles.linkInput}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    placeholder={"Put link to file here"}
                    returnKeyType={"done"}
                />
                <TouchableOpacity
                    style={[styles.saveButton, isEmpty && styles.isEmpty]}
                    onPress={() => this.saveLink()}
                    disabled={isEmpty}
                >
                    <Text style={styles.closeButtonText}>Save</Text>
                </TouchableOpacity>
                <Text style={styles.linkText}>
                    {`Link: ${link}`}
                </Text>
                <TouchableOpacity
                    style={styles.loadButton}
                    onPress={() => this.downloadFile()}
                >
                    <Text style={styles.loadButtonText}>Load file</Text>
                </TouchableOpacity>
                <Text style={styles.hashText}>{`File hash: ${hash}`}</Text>
            </Modal>
        );
    }
}
