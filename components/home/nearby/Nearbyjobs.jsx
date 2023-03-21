import { useRouter } from "expo-router";
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from "../../../constants";
import useFetch from '../../../hook/useFetch';
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import styles from './nearbyjobs.style';

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch('search', { query: 'React Developer', num_pages: 1 })
  console.log(error?.response?.data?.message)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              job_id={job.job_id}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs