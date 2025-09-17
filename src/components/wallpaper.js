import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
const Wallpaper = ({ children , contentStyle}) => {
    const { width, height } = Dimensions.get('window');

    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
        },
        backgroundImage: {
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.37)',
            width: width,
            height: height,
        },
        content: {
            // display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
        }
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/wallpaper.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

export default Wallpaper;