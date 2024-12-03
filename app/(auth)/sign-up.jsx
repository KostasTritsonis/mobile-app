import { Image,Text, View ,ScrollView, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from '../../constants';
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link,router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form,setForm] = useState({
    username:'',
    email:'',
    password:''
  });

  const submit = async () =>{
    if(!form.username || !form.email || !form.password){
      Alert.alert("Error","Please fill all the fields")
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email,form.password,form.username)

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error',error.message)
    } finally{
      setIsSubmitting(false);
    }
  }
  const [isSubmtting,setIsSubmitting]=useState(false);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Image source={images.logo}
             className="w-[115px] h-[35px]"
             reziseModed="contain" />
            <Text className="text-2xl text-white
             text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
            <FormField 
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({...form,username:e})}
              otherStyles="mt-10"
            />
            <FormField 
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({...form,email:e})}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField 
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({...form,password:e})}
              otherStyles="mt-7"
            />
            <CustomButton
             title="Sign up"
             handlePress={submit}
             containerStyles="mt-7"
             isLoading={isSubmtting}
             />
             <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-regular">Have an account already?</Text>
              <Link href={"/sign-in"} className="text-lg font-psemibold text-secondary">Sign in</Link>
             </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp