import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SvgXml } from "react-native-svg";
import target from "../../../assets/target-icon";
import { targetDestroyed } from "./encounterSlice";

export default function Character({ character, active }) {
  const dispatch = useDispatch();
  const targeted = useSelector((state) => state.encounter.target);

  const bg = active
    ? "bg-green-300"
    : character.type === "enemy"
    ? "bg-red-200"
    : character.type === "npc"
    ? "bg-cyan-200"
    : "bg-white";

  const handleChar = () => {
    //TODO
  };

  const handleTarget = () => {
    //TODO
    dispatch(
      targetDestroyed({
        target: target,
      }),
    );
  };

  return (
    <View className="w-full flex flex-row justify-between">
      <TouchableOpacity
        onPress={handleChar}
        className={`mx-2 mb-2 rounded-xl flex-grow ${bg}`}
      >
        <Text className={`font-[Scada] text-2xl p-2 m-auto`}>
          {character.name}
        </Text>
      </TouchableOpacity>
      <View className="flex flex-row">
        <View className={`mb-2 rounded-xl w-[60px] ${bg}`}>
          <Text className={`font-[Scada-Bold] text-3xl p-2 m-auto`}>
            {character.ac}
          </Text>
        </View>
        <View className={`mx-2 mb-2 w-[60px] rounded-xl ${bg}`}>
          <Text
            className={`font-[Scada-Bold] text-${
              character.hp < 100 ? "3xl" : "2xl"
            } p-2 m-auto`}
          >
            {character.hp}
          </Text>
        </View>
        <TouchableOpacity
          className={`mr-2 mb-2 rounded-xl ${bg}`}
          onPress={handleTarget}
        >
          <View className="p-2">
            <SvgXml xml={target.xml} fill="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
