import React from "react";
import {
    ActivityIndicator,
} from "react-native";
import { styles } from "./Loader.styles";

const Loader = () => {
    return (
        <ActivityIndicator size="large" color="red" style={styles.loader} />
    );
};

export default Loader;
