import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';


interface SignProps {
    size: number;
}

const SignUpAnimation: React.FC<SignProps> = ({ size }) => {
    return (
        <View
            style={{ height: size, aspectRatio: 1 }}
        >
            <LottieView
                style={{ flex: 1 }}
                source={require('../assets/Animations/register.json')}
                autoPlay
                loop
            />
        </View>
    )
}
//../assets/Animations/register.json
export default SignUpAnimation;