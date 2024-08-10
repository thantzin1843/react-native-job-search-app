import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

function ButtonTab({name,activeTab, handlePress}){
  return(
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={handlePress}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  )
}


const Tabs = ({tabs, setActiveTab,activeTab}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item})=>(
          <ButtonTab name={item} activeTab={activeTab} handlePress={()=>setActiveTab(item)} />
        )}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        keyExtractor={(item) => item}
      />
    </View>
  )
}

export default Tabs