import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Counter() {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

    return (
        <View>
            <TouchableOpacity
                onPress={() => dispatch(increment())}
                className="m-auto w-3/6 bg-red-700 rounded-lg">
                <Text className="text-white p-5">Increment</Text>
            </TouchableOpacity>
            <Text className="text-2xl">{count}</Text>
            <TouchableOpacity
                onPress={() => dispatch(decrement())}
                className="m-auto w-3/6 bg-red-700 rounded-lg">
                <Text className="text-white p-5">Decrement</Text>
            </TouchableOpacity>
        </View>
    )
}