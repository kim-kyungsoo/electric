import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Text, View, Button, StyleSheet,TouchableOpacity,TouchableHighlight  } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';
// const [timeToDisplay, setTimeToDisplay] = useState('');


export function CurrentDate () {
  const deviceTimeZone = RNLocalize.getTimeZone();
  const today = moment().tz(deviceTimeZone);
  const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
console.log('timezone, today, offset',deviceTimeZone,today,currentTimeZoneOffsetInHours );
var date = new Date();
var offsetInHours = date.getTimezoneOffset() / 60;
console.log('offsetInHours',offsetInHours);
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  var hours = Number(new Date().getHours()+currentTimeZoneOffsetInHours); //To get the Current Hours
  
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds
  return  (year+'.'+month+'.'+date+'. '+hours+':'+min+':'+sec);
  // const backEndTimeStamp = '2001-04-11 10:00:00';
  // const backEndTimeStamp = new Date().getDate(); 

  // // get device timezone eg. -> "Asia/Shanghai"
  // const deviceTimeZone = RNLocalize.getTimeZone();

  // // Make moment of right now, using the device timezone
  // const today = moment().tz(deviceTimeZone);

  // // Get the UTC offset in hours
  // const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
  // //const convertedToLocalTime = formatTimeByOffset(backEndTimeStamp,currentTimeZoneOffsetInHours);
  // // setTimeToDisplay(convertedToLocalTime);
  // return  convertedToLocalTime
}
export const formatTimeByOffset = (dateString, offset) => {
  
  if (!dateString) return ''
  if (dateString.length === 0) return ''

  const year = dateString.slice(0, 4)
  const month = dateString.slice(5, 7)
  const day = dateString.slice(8, 10)
  const hour = dateString.slice(11, 13)
  const minute = dateString.slice(14, 16)
  const second = dateString.slice(17, 19)

  const dateObject = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
  const currentHours = dateObject.getHours()
  dateObject.setHours(currentHours + offset)
  const newDateString = dateObject
    .toISOString()
    .replace('T', ' ')
    .slice(0, 16)
  return `${newDateString}`
}

export  function HeaderMenu(props) {
  
  //console.log('headerMenu props,', props);
  return (

    <View style={{flexDirection: 'row', marginTop:10, justifyContent:'center'}}>
      {/* <TouchableHighlight
        style={styles.button}
        onPress= {() => props.navigation.navigate('Chart', {chNum:props.chNum})}>
        <Text style={styles.text}>Chart</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress= {() => props.navigation.navigate('Data', {chNum:props.chNum})}>
        <Text style={styles.text}>Data</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button}
        onPress= {() => props.navigation.navigate('Param', {chNum:props.chNum})}>
        <Text style={styles.text}>Param</Text>
      </TouchableHighlight>

      <TouchableHighlight 
        style={styles.button}
        onPress= {() => props.navigation.navigate('Home', {chNum:props.chNum})}>
        <Text style={styles.text}>Home</Text>
      </TouchableHighlight> */}

      <TouchableHighlight 
        style={styles.button}
        onPress= {() => props.navigation.navigate('Login', {chNum:props.chNum})}>
        <Text style={styles.text}>Login</Text>
      </TouchableHighlight>
    </View >

  );
}
const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    marginLeft:200,
    width: 50,
    // alignItems: 'center',
   
  //backgroundColor: '#DDDDDD',
  },
  text:{
    textDecorationLine: 'underline',
    // textDecorationStyle: 'solid',
    // fontWeight:'900',
    textDecorationColor:'blue',

  }
});