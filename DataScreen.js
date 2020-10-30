/**
 * npm install react-native-table-component  --save // table creation
 * npm install react-native-fs --save  //file reading
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';
import {sampleData} from './sample';
import {HeaderMenu, CurrentDate} from './HeaderMenu';
import {MqttCom, sendSampleMqttCom} from './MqttCom';

let currentDate=0;
export default function DataScreen({route, navigation}) {
  
  const [tableHead, setTableHead]= useState(["서울역", "시청", "종각", "종로3가", "종로5가", "동대문", "신설동", "제기동", "청량리","동묘앞","시청","을지로입구","을지로3가","을지로4가",
            "동대문역사문화공원","신당","상왕십리","왕십리" ]);
  const [widthArr, setwidthArr] = useState([80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80]);
  const [tableData, setTableData]= useState(0);
  const [render, setRender]= useState(false);
  const [rcvSampleData, setRcvSampleData]=[];
  let url='mqtt://broker.hivemq.com:1883';
  let topic='kksu964';
 
 useEffect(() => {
  sendSampleMqttCom(url, topic, sampleData,setTableData, setRender);
  // let data=sampleData.map(e=> {
  //  let data=rcvSampleData.map(e=> {
  //     return Object.values(e);
  //   });
    //setRender(true);
    //setTableData(data);
    
  }, []);
 
//console.log("Datascreen route", route);
currentDate = CurrentDate();
    return (
     
      <View style={styles.container}>
        <HeaderMenu navigation={navigation} chNum={route.params.chNum} />
        <Text style={{fontSize:20, marginLeft:120,textDecorationLine: 'underline'}}>스마트팜 데이터 </Text>
          <View style ={{flexDirection: 'row',marginTop:10,  marginBottom:-5 }}>
            <Text style={{flex:1, marginLeft:5, fontSize:13}}>Chamber#{route.params.chNum} </Text>
            <Text style={{flex:1, marginLeft:130, fontSize:13}}>{currentDate} </Text>
          </View>
        { render == true ? (
          <ScrollView horizontal={true} style={{marginTop:5}}>
            <View >
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
              </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {
               tableData.map((rowData, index) => (
                 <Row
                   key={index}
                   data={rowData}
                   widthArr={widthArr}
                   style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                   textStyle={styles.text}
                 />
               ))
              }
              </Table>
            </ScrollView>
            </View>
          </ScrollView>): null}
        </View>
    );
}
    
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, paddingTop: 5, backgroundColor: '#fff' },
    header: { height: 40, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100', fontSize:12 },
    dataWrapper: { marginTop: -1 },
    row: { height: 25, backgroundColor: '#E7E6E1' }
  });

