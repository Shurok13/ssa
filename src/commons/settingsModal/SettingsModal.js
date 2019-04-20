import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Keyboard,
} from "react-native";
import Storage from "../../helpers/storage";
import Loader from "../../commons/loader";
import { styles } from "./SettingsModal.styles";

export default class SettingsModal extends Component {

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        handleScannerVisible: PropTypes.func.isRequired,
    };

    state = {
        text: "",
        loader: false,
        link: "",
    };

    componentDidMount() {
        this.getLink();
    }

    saveLink = async () => {
        Keyboard.dismiss();
        this.setState({ loader: true, text: "" });
        const { text } = this.state;
        if (text.length > 0) {
            await Storage.setData(process.env.URL_LINK, text);
        }
        this.setState({ loader: false });
    };

    getLink = async () => {
        const link = await Storage.getData(process.env.URL_LINK, "");
        if(link && link.length > 0) {
            this.setState({ link: link });
        }
    };

    render() {
        const { visible, handleScannerVisible } = this.props;
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
                <Text style={styles.linkText}>
                    {`Link: ${this.state.link}`}
                </Text>
                <TextInput
                    style={styles.linkInput}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    placeholder={"Put link here"}
                    returnKeyType={"done"}
                />
                <TouchableOpacity
                    style={[styles.saveButton, isEmpty && styles.isEmpty]}
                    onPress={() => this.saveLink()}
                    disabled={isEmpty}
                >
                    <Text style={styles.closeButtonText}>Save</Text>
                </TouchableOpacity>
            </Modal>
        );
    }
}
