
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native'
import useFetch from '../../hook/useFetch';
import { COLORS, SIZES } from '../../constants/theme';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import { icons } from '../../constants';
import Company from '../../components/jobdetails/company/Company';
import Tabs from '../../components/jobdetails/tabs/Tabs';
import About from '../../components/jobdetails/about/About';
import Specifics from '../../components/jobdetails/specifics/Specifics';
import Footer from '../../components/jobdetails/footer/Footer';
function JobDetails() {
    const params = useLocalSearchParams();
    const id = params.id;
    const router = useRouter();
    const {data, error , loading , refetch} = useFetch('job-details',{
        job_id:id,
    });

    // tabs 
    const tabsBtn = ['About', 'Qualifications', 'Responsibilities'];
    const [activeTab, setActiveTab] = React.useState(tabsBtn[0]);

    // 
    const displayTabContent = () => {
        switch (activeTab) {
          case "Qualifications":
            return (
              <Specifics
                title='Qualifications'
                points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
              />
            );
    
          case "About":
            return (
              <About info={data[0]?.job_description ?? "No data provided"} />
            );
    
          case "Responsibilities":
            return (
              <Specifics
                title='Responsibilities'
                points={data[0]?.job_highlights?.Responsibilities ?? ["N/A"]}
              />
            );
    
          default:
            return null;
        }
      };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
            options={{
                headerStyle:{backgroundColor:COLORS.lightWhite},
                headerTitle:'',
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft:()=>(
                    <ScreenHeaderBtn 
                        iconUrl={icons.left}
                        dimension='60%'
                        handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
                ),
            }}
        />

        <>
            {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
            {error && <Text>Error fetching data</Text>}
            <ScrollView>
            {data && (
                <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={data[0]?.employer_logo}
                  jobTitle={data[0]?.job_title}
                  companyName={data[0]?.employer_name}
                  location={data[0]?.job_country} 
                />

                <Tabs
                    tabs={tabsBtn}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {displayTabContent()}
                </View>
            )}
            </ScrollView>

            <Footer url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'}/>
        </>
    </SafeAreaView>
  )
}

export default JobDetails