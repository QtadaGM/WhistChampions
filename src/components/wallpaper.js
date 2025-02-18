const Wallpaper = ({ children }) => {
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
        },
        content: {
            flex: 1,
        }
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/wallpaper.png')}
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