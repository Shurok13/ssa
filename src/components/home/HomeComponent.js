import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid
} from 'react-native';
import CodeScanner from '../../commons/codeScanner';
import { styles } from './HomeComponent.styles';
import XMLParser from 'react-xml-parser';
import moment from 'moment';
import RNFS from 'react-native-fs';

export default class HomeComponent extends Component {

    state = {
        scannerVisible: false,
        loader: false,
    };

    componentDidMount() {
        // this.loadFile();
        this.readFile();
        // this.requestCameraPermission();
        // this.setState({ loader: true });
        // var x = new XMLHttpRequest();
        // x.open('GET', 'https://s3.eu-central-1.amazonaws.com/shurokphoto/rozn.xml', true);
        // console.log(x.responseXML);
        // x.onreadystatechange = function () {
        //     if (x.readyState == 4 && x.status == 200)
        //     {
        //         var doc = x.responseText;
        //         console.log(doc);
        //     }
        // };
        // x.send();
        // request.open('GET', 'https://s3.eu-central-1.amazonaws.com/shurokphoto/rozn.xml', true);
        // request.onreadystatechange = function () {
        //     console.log(request.responseText);
        //     if (request.readyState === 4 && request.status === 200) {
        //         var type = request.getResponseHeader('Content-Type');
        //         if (type.indexOf("text") !== 1) {
        //             return request.responseText;
        //             // console.log(request.responseText);
        //         }
        //     }
        // };
        // const xml = new XMLParser().parseFromString(x.responseText);
        //
        // console.log(x);
        // console.log(xml);

    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the EXTERNAL_STORAGE');
                this.readFile();
            } else {
                console.log('EXTERNAL_STORAGE permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    readFile = () => {

        RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((result) => {

                console.log('GOT RESULT', result);

                // stat the first file
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                    // if we have a file, read it
                    console.log("Start read file", moment().format('HH:mm:ss'));
                    return RNFS.readFile(statResult[1], 'utf8');
                }

                return 'no file';
            })
            .then((contents) => {
                // log the file contents
                console.log("Stop read file", moment().format('HH:mm:ss'));
                console.log(JSON.parse(contents));
                console.log("Stop JSON.parse file", moment().format('HH:mm:ss'));
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    };



    loadFile = () => {
        // xlsx.readFile('https://s3.eu-central-1.amazonaws.com/shurokphoto/rozn.XLS');
        // 'https://s3.eu-central-1.amazonaws.com/shurokphoto/rozn_copy.xml';

        return fetch('https://s3.eu-central-1.amazonaws.com/shurokphoto/rozn.xml')
            .then((response) => {
                if(response){
                    console.log("Start Parse", moment().format('HH-mm-ss'));
                    const xml = new XMLParser().parseFromString(response._bodyText);

                    RNFS.writeFile('/Users/aleksandrmalyjj/Documents/domains/ssa/test.txt', JSON.stringify(xml), 'utf8')
                        .then(() => {
                            console.log("Stop parse", moment().format('HH-mm-ss'));
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                }
                console.log("XML", moment().format('HH-mm-ss'));
                return response;
            })
            .then((response) => {
                // console.log(response);
                // const xml = new XMLParser().parseFromString(response._bodyText);
                // console.log(xml.toString());
                // console.log(xml.getElementsByTagName('brand'));
                console.log("XML", moment().format('HH:mm:ss'));
                this.setState({ loader: false });
            }).then(

            )
            .catch((error) => {
                console.error(error);
            });
    };

    handleScannerVisible = () => {
        this.setState({scannerVisible: !this.state.scannerVisible});
    };

    render() {
        // console.log(this.state);
        return (
            <View style={styles.container}>
                {this.state.loader && <ActivityIndicator size="large" color="red" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }} />}
                <Text style={styles.welcome}>Welcome to Shambala Shop Assistant</Text>
                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => {this.handleScannerVisible()}}
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
