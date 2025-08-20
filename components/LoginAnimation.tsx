import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


interface LoginProps {
    size: number;
}

const LoginAnimation: React.FC<LoginProps> = ({ size }) => {
    return (
        <View
            style={{ height: size, aspectRatio: 1 }}
        >
            <LottieView
                style={{ flex: 1 }}
                source={require('../assets/Animations/Login.json')}
                autoPlay
                loop
            />
        </View>
    )
}

export default LoginAnimation;