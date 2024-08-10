import { Stack, useRouter } from "expo-router";
import { View , Text, ScrollView} from "react-native"
import { SafeAreaView } from "react-native";

import { COLORS, FONT, SIZES ,icons, images} from "../constants";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import Welcome from "../components/home/welcome/Welcome";
import Popularjobs from "../components/home/popular/Popularjobs";
import Nearbyjobs from "../components/home/nearby/Nearbyjobs";
import { useState } from "react";


const Home =()=>{
    const router = useRouter();

    const [searchTerm , setSearchTerm] = useState("");
    return (
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor:COLORS.lightWhite,},
                    headerShadowVisible:false,
                    headerTitle:"",
                    headerLeft:()=>(
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>
                    ),

                    headerRight:()=>(
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%"/>
                    )
                }}
                
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,padding:SIZES.medium }}>
                <Welcome searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    handleClick={() => {
                        if (searchTerm) {
                          router.push(`/search/${searchTerm}`)
                        }
                      }}
                />
                <Popularjobs />
                <Nearbyjobs/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;