//import liraries
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

// create a component
const Rank = ({score, style}) => {
    // the image source debends on the score value passed to the component
    let imageSource;
    if (score <= 100) {
        name = 'ملازم';
        imageSource = require('../assets/images/ranks/1.png');
    } else if (score <=  200) {
        name = 'ملازم أول';
        imageSource = require('../assets/images/ranks/2.png');
    } else if (score <=  300) {
        name = 'نقيب';
        imageSource = require('../assets/images/ranks/3.png');
    } else if (score <=  400) {
        name = 'رائد';
        imageSource = require('../assets/images/ranks/4.png');
    } else if (score <=  500) {
        name = 'مقدم';
        imageSource = require('../assets/images/ranks/5.png');
    } else if (score <=  600) {
        name = 'عقيد';
        imageSource = require('../assets/images/ranks/6.png');
    } else if (score <=  700) {
        name = 'عميد';
        imageSource = require('../assets/images/ranks/7.png');
    } else if (score > 800) {
        name = 'لواء';
        imageSource = require('../assets/images/ranks/8.png');
    } else if (score <=  900) {
        name = 'فريق';
        imageSource = require('../assets/images/ranks/9.png');
    } else if (score <=  1000) {
        name = 'فريق أول';
        imageSource = require('../assets/images/ranks/10.png');
    } else {
        name = 'مشير';
        imageSource = require('../assets/images/ranks/11.png');
    }
    // console.log(imageSource);
    return (
        <View style={styles.container }>
            <Image source={imageSource} resizeMode='contain' style={{ ...style, aspectRatio: '1/1' }} />
            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default Rank;
