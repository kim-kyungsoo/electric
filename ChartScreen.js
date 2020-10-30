/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,  StyleSheet,
  ScrollView,  View,
  Text,  Dimensions,	StatusBar,
} from 'react-native';

import {
  Header,  LearnMoreLinks,  Colors,
  DebugInstructions,  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  LineChart,  BarChart,  PieChart,  ProgressChart,
  ContributionGraph,  StackedBarChart
} from "react-native-chart-kit";
import {HeaderMenu, CurrentDate} from './HeaderMenu';
import {sampleData} from './sample';

export default function ChartScreen({route, navigation}) {

  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  let xlabel=[];
	let currentDate=0;
	let subject='';

  //let dataset = ["348", "321", "348", "741", "940", "1401", "2166", "2844", "3055",2341, 2341, 3370, 3226, 3447, 3277, 
     // 2898, 2590,3004, 2234, 2234, 2234, 2234,"348", "321", "348", "741", "940", "1401", "2166", "2844" ];
    const [render, setRender]= useState(false);
  let dataset =[];
  for(let i=0; i<sampleData.length; i++) {
    dataset.push(sampleData[i]["150"]);
  }
  console.log('dataset', dataset);
  /*useEffect(() => {
    for(let i=0; i<sampleData.length; i++) {
      dataset.push(sampleData[i]["150"]);
    }
    setRender(true);
  }, []);*/
  currentDate=CurrentDate();

	for(let i=0; i< sampleData.length; i++) {
		if(i%5 && date>=30)
			xlabel.push(month+'.'+date-30);
		else if(i%5 ==0 && i+date >=30) {
			xlabel.push(month +'.'+(i+date -30));
		} 	else if(i%5 ==0 && i+date <= 30) {
			xlabel.push(month-1+'.'+(date+i));
		} 	else {
			xlabel.push(" ");
		}
	}
	xlabel.push(month+'.'+date);
subject ='서울역';
  
  return (
           
<View style={styles.container}>  
    <HeaderMenu navigation={navigation} chNum={route.params.chNum} />
    <Text style={{fontSize:20, marginLeft:130,textDecorationLine: 'underline'}}>스마트팜 차트 </Text>
      <View style ={{flexDirection: 'row',marginTop:10,  marginBottom:-5 }}>
        <Text style={{flex:1, marginLeft:5, fontSize:13}}>Chamber#{route.params.chNum} </Text>
        <Text style={{flex:1, marginLeft:160, fontSize:13}}>{currentDate} </Text>
      </View>
  
  <Text  style={{fontSize:15, marginTop:10, textDecorationLine:'underline'}}>{subject}</Text>

  <LineChart
    data={{
		labels: xlabel,
         datasets: [ { data: dataset }   ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix="명"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "white",
      backgroundGradientFrom: "white",
      backgroundGradientTo: "white",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
      style: {
        borderRadius: 1
      },
      propsForDots: {
        r: "1",
        strokeWidth: "1",
        stroke: "black"
      }
    }}
    bezier  style={{
      marginVertical: 8,
      borderRadius: 1
    }}
  />

</View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.black,
    fontSize: 9,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

