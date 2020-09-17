import React, { useState, useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { Text, View } from '../components/Themed';

const TabTwoScreen = () => {

  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const callback = (downloadProgress: {totalBytesWritten: number; totalBytesExpectedToWrite: number;}) => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
    setDownloadProgress(progress);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
      'https://www.dropbox.com/s/bbanb9ktz9g4t75/dataMin.json?dl=1',
      // 'https://www.dropbox.com/s/4d1oqff1bwyyd7r/dataMin.json?dl=1',
      FileSystem.documentDirectory + 'data.json',
      {},
      callback
  );

  const download = async () => {
    try {
      // @ts-ignore
      const { uri } = await downloadResumable.downloadAsync();
      if ( uri ) {
        alert('Finished downloading');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Download Progress {downloadProgress}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Download" onPress={download} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default TabTwoScreen;
