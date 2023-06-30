import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import Header from '../features/campaigns/Header';
import CharacterList from '../features/campaigns/CharacterList';
import Notes from '../features/campaigns/Notes';

export default function Campaign() {

  const campaign = useSelector(state => (state.campaign))
  const [loading, setLoading] = useState(false)

  if (loading) {
    return <StatusBar />
  }

  else {
    return (
      //     <View style={styles.container}>
      //       <View style={styles.header}>
      //         <Text>Main Quest:</Text>
      //         <Text>{Object.keys(campaign.quests)[0]}</Text>
      //         <Text>Current Objective:</Text>
      //         <Text>{campaign.currentQuest}</Text>
      //       </View>
      //       <View style={styles.contentContainer} className="h-[120px] border-2">
      //         <View className="bg-slate-200">
      //           <Text className="font-[Scada] m-auto font-bold text-xl">Party:</Text>
      //           <ScrollView style={styles.leftColumn} className="">
      //               <CharacterList />
      //           </ScrollView>
      //         </View>
      //         <View className="bg-slate-200">
      //           <Text className="font-[Scada] w-1/2 m-auto font-bold text-xl">Notes:</Text>
      //           <ScrollView style={styles.leftColumn} className="w-full">
      //             <View style={styles.scrollableContent} className="w-[200px] h-[320px]">
      //               <Notes />
      //             </View>
      //           </ScrollView>
      //         </View>
      //         {/* <View style={styles.rightColumn} className="border-2 border-red-500">
      //           <Text className="font-[Scada] m-auto font-bold text-xl">Notes:</Text>
      //           <Notes />
      //         </View> */}
      //       </View>
      //     </View>
      //   );
      <View>
        <View className="bg-slate-200 w-full">
          <Header />
        </View>
        <View className="flex-row">
          <ScrollView className="w-1/2 bg-slate-200">
            <View className="p-4">
              <Text className="text-lg font-[Scada] m-auto">Party:</Text>
              <CharacterList />
            </View>
          </ScrollView>
          <ScrollView className="w-1/2 bg-slate-200">
            <View className="p-4">
              <Text className="text-lg font-[Scada] m-auto">Notes:</Text>
              <Notes />
            </View>
          </ScrollView>
        </View>
        <View className="h-[150px] bg-blue-500 justify-center items-center">
          <Text>Toolbox</Text>
        </View>
      </View>

    );

  }
}