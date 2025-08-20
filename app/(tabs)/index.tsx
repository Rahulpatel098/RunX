import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useAuth } from '@/context/authContext'
import VideoSkeleton from "../../util/VideoSkeleton";
const Index = () => {
  const {signOut} =useAuth();
  return (
    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
     
      <VideoSkeleton/>
    </View>
  )
}

export default Index