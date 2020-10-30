/**
 * 
 * npm install react-native-modal==> for Modal Window
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Text, TextInput,View,  Alert, StyleSheet, 
    FlatList, TouchableHighlight, Modal, Picker} from 'react-native';
// import Modal from 'react-native-modal';
import {HeaderMenu, CurrentDate} from './HeaderMenu';
import {MqttCom} from './MqttCom';


export default function ParmScreen({route, navigation}) {
  
  const [parmSelId, setParmSelId]=useState(0);
  const [currentValue, setCurrentValue]=useState(0);
  const [visibility, setVisibility]=useState(false);
  const [parmSettingValue, setParmSettingValue]=useState(false);
  const [modalType, setModalType]=useState(0);
  const [dataSource, setDataSource]=useState([
    { id: '0', name: '온도', value: 10 , type:0},
    { id: '1', name: '습도', value: 11, type: 0 },
    { id: '2', name: '양액', value: 12,type:0},
    { id: '3', name: 'Avatar', value: 13, type:0 },
    { id: '4', name: 'CheckBox', value: 14, type:0 },
    { id: '5', name: 'Header', value: 15, type:1 },
    { id: '6', name: 'Icon', value: 16, type:1 },
    { id: '7', name: 'Lists', value: 17, type:1 },
    { id: '8', name: 'Rating ', value: 18, type:1 },
    { id: '9', name: 'Pricing', value: 19, type:1 },
    { id: '10', name: 'Avatar', value: 20, type:1 },
    { id:'11', name: 'CheckBox', value: 21, type:0 },
    { id: '12', name: 'Header', value: 22, type:0 },
    { id: '13', name: 'Icon', value: 23, type:0 },
    { id: '14', name: 'Lists', value: 24, type:0 },
    { id: '15', name: 'Rating', value: 25, type:0 },
    { id: '16', name: 'Pricings', value: 26, type:0 },
    { id: '17', name: 'Pricings1', value: 27, type:0 },
    { id: '18', name: 'Pricings2', value: 28, type:0}
  ]);
  let url='mqtt://broker.hivemq.com:1883';
  let topic='kksu964';
  let currentDate=0;
  
  currentDate=CurrentDate();
  //console.log('Parm route', route);
  renderHeader= () => {
    var header= (
      <View style ={styles.header_footer_style}>
        <Text style ={styles.textStyle}> Courses Offered By Edubca </Text>
      </View>
    );
    return header;
  };
  
  renderSeparator = () => {
    return (
      <View
        style={{height:1 ,width: "100%", backgroundColor: "#000"}}
      />
    );
  };

  setModalVisibility= (visible, item) => {

    setVisibility(visible);
    setModalType(item.type);
    setParmSelId(item.id);
    setCurrentValue(item.value);
    
    console.log('item value', item.value);
  }
  getListViewItem = (item) => {
    Alert.alert('Clicked Item : ' + item.name+'     '+ visibility+' ' );
  }

  const modalType0 = (url, topic, modalType, visibility, parmSettingValue, currentValue, dataSource, setDataSource, parmSelId,setCurrentValue) => {
    return(
    <Modal animationType = "slide" transparent = {false} visible = {visibility}>
          <View style={styles.modalSize}>
          <Text style={{fontSize:20,textDecorationLine:'underline' }}> 스마트팜 파라미터 변경</Text>
            <Text style={{marginTop:40}}>항 목: {dataSource[parmSelId].name}  </Text>
            <Text style={{marginTop:10}}>현재값: {currentValue} </Text>
            <View style={{flexDirection:'row', marginTop: 5}}>
              <Text style={{fontSize:13, marginTop:10}}> 변경값:  </Text> 
              {modalType==0 ? (<TextInput style = { styles.textInput }
                onEndEditing= {e => { 
                  //console.log('parmsetting', e.nativeEvent.text);
                  setParmSettingValue(e.nativeEvent.text);
                  //console.log('변경값:', e.nativeEvent.text);
                  MqttCom(url, topic, e.nativeEvent.text,dataSource, setDataSource, parmSelId,setCurrentValue);
                  
                 }}
              ></TextInput>) : (
              <Picker
                selectedValue={parmSettingValue}
                style={{ height: 30, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>  {
                setParmSettingValue(itemValue);
                MqttCom(url, topic, itemValue,dataSource, setDataSource, parmSelId,setCurrentValue);
              }}
             >
            <Picker.Item style={{height: 10, width: 100 }} label="열림" value="열림" />
            <Picker.Item style={{height: 10, width: 100 }} label="닫힘" value="닫힘" />
            </Picker>)}
              {/* <Text style={{marginLeft:50, padding:5, borderWidth:1, width:50, backgroundColor:'lime'}}
                  onPress={() => {
                    MqttCom(url, topic, parmSettingValue,dataSource, setDataSource, parmSelId,setCurrentValue);
                    
                  }}> 확인 </Text>   */}
            </View>
          
            <TouchableHighlight 
              onPress = {() => {
                  setVisibility(false);
              }} >
                <Text style={{marginTop:30,  paddingTop:5, alignItems:'center', borderWidth:1, width:200, height:30, backgroundColor:'#E2E6E4'}}>                      확 인 </Text> 
            </TouchableHighlight>  
        </View> 
      </Modal>
    )
  }
  //console.log("Parmcreen route", route);
  
    return (
      <View style={styles.container}>  
      <HeaderMenu navigation={navigation} chNum={route.params.chNum} />
        { modalType0(url, topic, modalType, visibility, parmSettingValue, currentValue,dataSource, setDataSource, parmSelId,setCurrentValue)}
          <Text style={{fontSize:20, marginLeft:130,textDecorationLine: 'underline'}}>스마트팜 파라미터 </Text>
          <View style ={{flexDirection: 'row',marginTop:10,  marginBottom:-5 }}>
            <Text style={{flex:1, marginLeft:5, fontSize:13}}>Chamber#{route.params.chNum} </Text>
            <Text style={{flex:1, marginLeft:160, fontSize:13}}>{currentDate} </Text>
          </View>
        <View style={{marginTop:10,flexDirection: 'row', height:30, backgroundColor:'grey'}}>
          <Text style={styles.item}>항목</Text>
          <Text style={styles.pressItem} >설정값</Text>
        </View>
        <FlatList
          data={dataSource}
          renderItem={({item}) => {
            return(
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.item}>{item.name} </Text>
                <Text style={styles.pressItem} 
                      onPress={()=>setModalVisibility(true, item)}>{item.value} </Text> 
              </View>
              )}}
          ItemSeparatorComponent={renderSeparator}
          
        />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalSize: {
    flex:1,
    marginLeft:100,
    marginTop:100,
    width:400,
    height:400,
  },
  pressItem: {
    flex:1,
    padding:5,
    marginLeft: 100,
    fontSize: 13,
    height: 30,
    textDecorationLine:'underline'
  },
  item: {
    flex:1,
    padding: 5,
    fontSize: 13,
    height: 30,
  },
  textInput: {
    height: 30,
    paddingLeft:5,
    padding:-5,
    borderColor: 'gray',
    width:100,
    borderWidth: 1,
  },
})