import { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setLast20, setLastNon20 } from "./dierollSlice";

export default function Dieroll() {
  const dispatch = useDispatch();

  const [showResult, setShowResult] = useState(false);
  const [show20s, setShow20s] = useState(false);
  const [twunnys, setTwunnys] = useState([]);
  const [result, setResult] = useState({ dice: {}, total: 0 });
  const resultParser = (res) =>
    `${res.total} (${Object.keys(res.dice).map(
      (die, i) => `${i > 0 ? "+" : ""}${res.dice[die].length}d${die}`,
    )})`
      .split("")
      .filter((char) => char !== ",")
      .join("");
  // Modes can be "delay" or "toggle"
  const { twentyMode, nonTwentyMode } = useSelector((state) => state.dieroll);
  const lastNon20s = useSelector((state) => state.dieroll.non20s);
  const last20s = useSelector((state) => state.dieroll.twunnies);
  const resetDelay = useSelector((state) => state.dieroll.delay);

  // Timer logic
  const non20ResetRef = useRef(null);
  const twunnyResetRef = useRef(null);

  const startNon20Timer = () => {
    if (!non20ResetRef.current) {
      setShowResult(true);
      non20ResetRef.current = setTimeout(resetNon20s, resetDelay);
    }
  };
  const stopNon20Timer = () => {
    if (non20ResetRef.current) {
      clearTimeout(non20ResetRef.current);
      non20ResetRef.current = null;
    }
  };

  const start20Timer = () => {
    if (!twunnyResetRef.current) {
      setShow20s(true);
      twunnyResetRef.current = setTimeout(reset20s, resetDelay);
    }
  };
  const stop20Timer = () => {
    if (twunnyResetRef.current) {
      clearTimeout(twunnyResetRef.current);
      twunnyResetRef.current = null;
    }
  };

  const resetNon20s = () => {
    setShowResult(false);
    dispatch(setLastNon20(result));
    setResult({ dice: {}, total: 0 });
  };

  const reset20s = () => {
    setShow20s(false);
    dispatch(setLast20(twunnys));
    setTwunnys([]);
  };

  const handleNon20 = (die) => {
    let num = Math.ceil(Math.random() * die);
    let toUpdate = result.dice;
    toUpdate[die] ? toUpdate[die].push(num) : (toUpdate[die] = [num]);
    let newTotal = Object.keys(toUpdate).reduce(
      (total, die) =>
        total + toUpdate[die].reduce((sum, roll) => sum + roll, 0),
      0,
    );
    setResult({ dice: toUpdate, total: newTotal });
    if (nonTwentyMode === "delay") {
      stopNon20Timer();
      startNon20Timer();
    } else {
      setShowResult(true);
    }
  };

  const handle20 = () => {
    let num = Math.ceil(Math.random() * 20);
    let toUpdate = twunnys.slice(0);
    toUpdate.push(num);
    setTwunnys(toUpdate);
    if (twentyMode === "delay") {
      stop20Timer();
      start20Timer();
    } else {
      setShow20s(true);
    }
  };

  const handleUndo = () => {
    if (lastNon20s) {
      setResult(lastNon20s);
      setShowResult(true);
    }
    if (last20s) {
      setTwunnys(last20s);
      setShow20s(true);
    }
  };

  const non20s = [4, 6, 8, 10, 12];

  return (
    <View style={styles.box}>
      {showResult && (
        <View>
          <Button
            style={styles.result}
            title={resultParser(result)}
            onPress={resetNon20s}
          ></Button>
        </View>
      )}
      {show20s && (
        <View>
          <Button
            style={styles.result}
            title={`d20: ${twunnys.map((roll) => ` ${roll.toString()}`)}`}
            onPress={reset20s}
          ></Button>
        </View>
      )}
      <TouchableOpacity style={styles.undo} onPress={handleUndo}>
        <Text>Undo</Text>
      </TouchableOpacity>
      <View style={styles.dieContainer}>
        {non20s.map((die) => (
          <TouchableOpacity
            style={styles.die}
            onPress={() => handleNon20(die)}
            key={die}
          >
            <Text style={styles.dieFace}>{`d${die}`}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.die} onPress={handle20}>
          <Text style={styles.dieFace}>d20</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  resultBox: {},
  result: {
    textAlign: "center",
  },
  dieContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    flex: 1,
    width: "100%",
    // padding: 10,
    bottom: 5,
  },
  die: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dieFace: {
    fontFamily: "Scada-Bold",
    color: "white",
  },
  undo: {},
});
