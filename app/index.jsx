import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image,Text, View ,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from '../constants';
import CustomButton from "../components/CustomButton";
import {useGlobalContext} from '../context/GlobalProvider';

export default function Index() {
  const {isLoading,isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contetContainerStyle={{height:'100%'}}>
        <View className="w-full pt-1 justify-center items-center min-h-[85vh] px-4">
          <Image 
            source={images.logo} 
            className="w-[150px] h-[45px]"
            reziseModed="contain"
          />
          <Image 
            source={images.cards} 
            className="max-w-[380px] w-full h-[300px]"
            reziseModed="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">Discover Endless
              Posibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image source={images.path}
            className="w-[110px] h-[13px] absolute -bottom-2 -right-1"
            reziseModed="contain" />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-6 text-center ">
            Where creativity meets innovation: embark
            on a journey of limitless exploration with Aora</Text>
          <CustomButton title="Continue with Email" handlePress={()=>router.push('/sign-in')} containerStyles="w-full mt-7" />
        </View>
        <StatusBar backgroundColor="#161622"  style="light"/>
      </ScrollView>
    </SafeAreaView>
  );
}
