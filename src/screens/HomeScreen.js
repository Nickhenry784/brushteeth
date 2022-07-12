import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  TextInput, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import CheckBox from "@react-native-community/checkbox";
import { de } from "date-fns/locale";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const [modalState, setModalState] = useState(false);
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const [start, setStart] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(start && second > 0 && minutes >= 0 && time >= 0 ){
        setSecond(second - 1);
      };
      if(start && second === 0 && minutes > 0 && time >= 0 ){
        setSecond(60);
        setMinutes(minutes - 1);
      }
      if(start && minutes === 0 && time > 0 && second === 0){
        setMinutes(60);
        setSecond(60);
        setTime(time - 1);
      }
      if(start && second === 0 && minutes === 0 && time === 0 ){
        setStart(false);
        setSuccess(true);
      };
    },1000);

    return() => {
      clearTimeout(timeOut)
    }
  },[second,start]);

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = () => {
    if(points === 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    setModalState(true);
  }

  const onClickOKButton = () => {
    setModalState(false);
    setStart(true);
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.turnText}>{`Turn: ${points.value}`}</Text>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.iconbuy} style={appStyle.buyImage} />
          </View>
        </TouchableOpacity>
      </View>
      <ImageBackground style={appStyle.centerView} source={images.frame}>
        <Text style={appStyle.timeText}>{`${time} : ${minutes} : ${second}`}</Text>
      </ImageBackground>
      <TouchableOpacity onPress={onClickStartButton}>
        <Image source={images.start} style={appStyle.createButton} />
      </TouchableOpacity>
      {modalState && <View style={appStyle.modalView}>
          <View style={appStyle.panelModal}>
            <Text style={appStyle.labelText}>Time</Text>
            <View style={appStyle.timeInput}>
              <TextInput
              style={appStyle.input}
              onChangeText={setTime}
              value={time.toString()}
              keyboardType="numeric"
              />
              <Text style={appStyle.labelText}>:</Text>
              <TextInput
              style={appStyle.input}
              onChangeText={setMinutes}
              value={minutes.toString()}
              keyboardType="numeric"
              />
            </View>
            <TouchableOpacity onPress={onClickOKButton}>
              <Image source={images.start} style={appStyle.createButton} />
            </TouchableOpacity>
          </View>
        </View>}
        { success && <View style={appStyle.modalView}>
            <TouchableOpacity onPress={() => setSuccess(false)}>
              <Image source={images.success} style={appStyle.backStyle} />
            </TouchableOpacity>
          </View>}
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
  logoImage: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.7,
    resizeMode: 'contain',
  },
  modalView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelModal: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  timeInput: {
    width: '50%',
    height: windowHeight * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    alignSelf: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  appBar: {
    flex: 0.2,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    margin: 10,
  },
  scoreStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    margin: 8,
  },
  turnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  labelText1: {
    marginTop: 30,
    fontSize: 30,
    color: '#00aeef',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 30,
    color: '#00aeef',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 60,
    color: '#00aeef',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  centerView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    marginTop: windowHeight * 0.2,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: windowHeight * 0.1,
  },
  createButton: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  backStyle: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    resizeMode: 'contain',
  },
});

export default HomeScreen;