import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import Header from '../features/campaigns/Header';
import Footer from '../features/campaigns/Footer';
import CharacterList from '../features/campaigns/CharacterList';
import Notes from '../features/campaigns/Notes';

export default function Campaign({ navigation }) {

  
  const campaign = useSelector(state => (state.campaign))
  const [loading, setLoading] = useState(false)
  
  // const [bodyHeight, setBodyHeight] = useState(0)
  // useEffect(() => {
  //   const windowHeight = Dimensions.get('window').height;
  //   const headerHeight = 200;
  //   const footerHeight = 150;
  //   const remaining = windowHeight - headerHeight - footerHeight
  //   setBodyHeight(remaining)
  // }, [])

  if (loading) {
    return <StatusBar />
  }

  // else {
  //   return (
      // <View className="h-full flex-1">
      //   <View className="bg-slate-200 w-full">
      //     <Header />
      //   </View>
      //   <View className="flex flex-grow">
      //     <View className="flex-row">
      //       <ScrollView className="w-1/2 bg-slate-200">
      //         <View className="p-4 overflow-scroll h-full">
      //           <Text className="text-lg font-[Scada] m-auto">Party:</Text>
      //           <CharacterList />
      //         </View>
      //       </ScrollView>
      //       <ScrollView className="w-1/2 bg-slate-200">
      //         <View className="flex-grow-1 p-4 overflow-scroll">
      //           <Text className="text-lg font-[Scada] m-auto">Notes:</Text>
      //           <Notes />
      //         </View>
      //       </ScrollView>
      //     </View>
      //   </View>
      //   <View className="h-[150px] bg-blue-500 justify-center items-center fixed bottom-0">
      //     <Footer navigation={navigation} />
      //   </View>
      // </View>
      const [maxHeight, setMaxHeight] = useState(0)
      useEffect(() => {
        const windowHeight = Dimensions.get('window').height;
        const headerHeight = 200; // Update with the actual header height
        const footerHeight = 150; // Update with the actual footer height
    
        const remainingHeight = windowHeight - headerHeight - footerHeight;
        setMaxHeight(remainingHeight);
      }, []);
    
      return (
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <View style={styles.column}>
              <View style={styles.columnHeader}>
                <Text style={styles.columnTitle}>Party</Text>
              </View>
              <ScrollView style={styles.columnScrollView}>
                <CharacterList />
              </ScrollView>
            </View>
            <View style={styles.column}>
              <View style={styles.columnHeader}>
                <Text style={styles.columnTitle}>Notes</Text>
              </View>
              <View style={styles.whiteboard}>
                <ScrollView style={styles.columnScrollView}>
                  <Notes />
                </ScrollView>
              </View>
            </View>
          </View>
          <Footer />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        //backgroundColor: '#f1f5f9'
      },
      content: {
        flex: 1,
        flexDirection: 'row',
      },
      column: {
        flex: 1,
        backgroundColor: '#e5e7eb',
      },
      columnHeader: {
        //backgroundColor: 'white',
        padding: 16,
        alignItems: 'center',
      },
      columnScrollView: {
        flex: 1,
      },
      columnTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Scada'
      },
      whiteboard: {
        flex: 1,
        borderStyle: 'solid',
        borderColor: 'red',
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 4
      }
    });