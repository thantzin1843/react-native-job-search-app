import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import styles from './nearbyjobs.style'
import useFetch from '../../../hook/useFetch'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { COLORS } from '../../../constants'
import { useRouter } from 'expo-router'

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, loading, error } = useFetch("search", {
    query: "Node.js developer",
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <Text style={styles.headerBtn}>Show all</Text>
      </View>

      <View style={styles.cardsContainer}>
        {
          loading ? (
            <ActivityIndicator size='large' color={COLORS.primary}/>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
              data?.map((job)=>(
                <NearbyJobCard job={job}
                key={`nearby-job-${job.job_id}`} handlePress={() => router.push(`/job-details/${job.job_id}`)}/>
            )) 
          )
          
        }
      </View>
    </View>
  )
}

export default Nearbyjobs