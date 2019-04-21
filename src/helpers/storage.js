import { AsyncStorage } from "react-native";

/**
 * @author Alex Malyi <am@piogroup.net>
 */
const Storage = {

    getData (key, defaultValue = null) {
        try {
            const item = AsyncStorage.getItem(key);
            return item ? item : defaultValue;
        } catch (error) {
            return {};
        }
    },

    setData (key, value = {}) {
        AsyncStorage.setItem(key, value);
    },

    clearStorage () {
        AsyncStorage.clear();
    },

    setFileData (data) {
        this.setData(process.env.DATA_KEY, data);
    },

    getFileData () {
        this.getData(process.env.DATA_KEY);
    },

    removeItem(key) {
        AsyncStorage.removeItem(key);
    },
};

export default Storage;
