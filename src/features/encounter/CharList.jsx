import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import {
  nextChar,
  statusAdded,
  statusRemoved,
  hpAdded,
  hpRemoved,
  targetDestroyed,
  setChars
} from "./encounterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

import Character from "./Character";

export default function CharList(props) {
  const route = useRoute();
  const encounter = useSelector((state) => state.encounter);
  const dispatch = useDispatch();

  const handleResort = ({data}) => {
    dispatch(setChars(data))
  }

  const renderItem = ({ item, drag, isActive }) => {

    const active = item.name === encounter.chars[encounter.active].name

    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          // style={[
          //   styles.rowItem,
          //   { backgroundColor: isActive ? "red" : item.backgroundColor },
          // ]}
        >
          <Character character={item} active={active}/>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };


  // const renderItem = (info) => {
  //   const { item, onDragStart, onDragEnd, isActive } = info

  //   return (
  //     <TouchableOpacity
  //       key={Math.random()}
  //       onPressIn={onDragStart}
  //       onPressOut={onDragEnd}
  //     >
  //       <Text>{item.name}</Text>
  //     </TouchableOpacity>
  //   )
  // }

  return (
    <View>
      {encounter.chars &&
        // encounter.chars.map((char, i) => (
        //   <Character character={char} key={i} active={i === encounter.active} />
        // ))
        <DraggableFlatList
          data={encounter.chars}
          onDragEnd={handleResort}
          keyExtractor={({key}) => (key)}
          // onReordered={onReordered}
          renderItem={renderItem}
        />
      }
      {/* {!encounter.chars && <Text>{JSON.stringify(encounter)}</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});