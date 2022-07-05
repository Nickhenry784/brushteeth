import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  TextInput, 
  Alert  } from "react-native";
import React, {useEffect, useState,useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import { images } from "../assets";
import { FlatList } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBtn = [
  {id: 1, image: images.s1},
  {id: 2, image: images.s2},
  {id: 3, image: images.s3},
  {id: 4, image: images.s4},
  {id: 5, image: images.s5},
  {id: 6, image: images.s6},
  {id: 7, image: images.s7},
  {id: 8, image: images.s8},
  {id: 9, image: images.s9},
]

const numCol = 3;

const PlayScreen = () => {
  const navigation = useNavigation();

  const [time, setTime] = useState(5);
  const [score, setScore] = useState(0);
  const [listItem, setListItem] = useState(dataBtn);
  const [result, setResult] = useState(null);

  const [randomPos, setRandomPos] = useState(Math.floor(Math.random() * 8));

  useEffect(() => {
    const timeOut = setTimeout(()=> {
      if(time > 0){
        setTime(time - 1);
      }
      if(time === 0){
        if(result === null){
          navigation.goBack();
          return false;
        }
        if(result.id === dataBtn[randomPos].id){
          setScore(score + 10);
          setRandomPos(Math.floor(Math.random() * 8));
          setResult(null);
          const list = [...dataBtn];
          for (let index = 0; index < list.length; index++) {
            const element = list[index];
            list.splice(index,1);
            list.splice(Math.floor(Math.random() * 8),0,element);
          }
          setListItem([...list]);
          setTime(5);
        }else{
          navigation.goBack();
          clearTimeout(timeOut);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[time]);

  const onClickItemImage = (item) => {
    setResult(item);
    setTime(1);
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.turnText}>{`SCORE: ${score}`}</Text>
      </View>
      <Text style={appStyle.timeText}>Time</Text>
      <Text style={appStyle.timeNumber}>{time}</Text>
      <View style={appStyle.playView}>
        <Image source={dataBtn[randomPos].image} style={appStyle.playBtn} />
      </View>
      <Text style={appStyle.labelText}>Choose the right image with the model</Text>
      <View style={appStyle.bottomView}>
        <FlatList 
          data={listItem}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onClickItemImage(item)} key={item.id}>
              <Image source={item.image} style={appStyle.itemImage} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  appBar: {
    flex: 0.1,
    paddingRight: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 30,
    fontFamily: 'knitting-pattern',
    color: 'white',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  playView: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  labelText: {
    fontSize: 26,
    fontFamily: 'knitting-pattern',
    color: 'white',
    textAlign: 'center',
  },
  bottomView: {
    flex: 0.6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText:{
    fontSize: 40,
    fontFamily: 'knitting-pattern',
    color: 'white',
  },
  timeNumber: {
    fontSize: 40,
    fontFamily: 'knitting-pattern',
    color: 'white',
  },
});

export default PlayScreen;