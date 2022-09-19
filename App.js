import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = React.useState();
  const [time,setTime]= React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>RECORDING APP</Text>
      <Button 
        title={recording ? 'Start Recording'  : 'Start Recording'}
        onPress={recording ? startRecording : startRecording}
       />
       <Text style={styles.txt}>STOP THE RECORD</Text>
            <Button 
        title={recording ? 'Stop Recording'  : 'Stop Recording'}
        onPress={recording ? stopRecording : stopRecording}
      >stop</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius:'10 solid black',
    flex: 2,
    borderWidth:20,
    borderRadius:10,
    borderColor:'yellow',borderWidth:5,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    maxWidth:641,
    margin:'auto',
    maxHeight:1061,
  },
  text:{
    fontFamily:'Yatra-One',
    color:'#98111E',
    fontSize:60,
    fontWeight:'bold',
    textTransform:'uppercase',
    fontStyle:'italic',
    justifyContent:'center',
    marginBottom:100,
    textAlign:'center',

  },
txt:{
  color:'#750000',
  fontSize:20,
  textTransform:'uppercase',
  fontFamily:'Yatra-One',
  fontStyle:'italic',
  marginTop:100,
  textAlign:'center',
  backgroundColor:'#f8f8f8',
}

});
