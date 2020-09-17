import React, { useState, useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from "expo-file-system";
import { Text, View } from '../components/Themed';

// types
import { DataType } from "../types";

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const findItem = async (code: string) => {
    try {
      const data = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data.json');
      const parsedData: DataType = JSON.parse(data);
      const item = parsedData.products.find(productItem => productItem.article === code);
      if (item) {
        alert(item && `Total Products: ${parsedData.products.length}. ProductName: ${item.name}`);
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleBarCodeScanned = ({ type, data }: {type: string, data: string}) => {
    setScanned(true);
    findItem(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
          // @ts-ignore
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
