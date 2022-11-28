import { Pressable, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, addTodo, deleteTodo } from '../features/todo/todoSlice';
import { TodoState } from '../types/app';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

function SecondPage({ navigation }: { navigation: any }) {
  const [text, setText] = useState<string>('');

  //Get todos from redux toolkit
  const todos = useSelector<TodoState[]>((state) => state) as TodoState[];
  const newTodos = [...todos].reverse();
  const dispatch = useDispatch();

  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(offset.value, {
            damping: 30,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  return (
    <SafeAreaView className='dark:bg-slate-900 bg-neutral-300 h-full flex flex-col relative'>
      {/* Display Todos */}
      <View className='bg-slate-900 p-4'>
        <Text className='text-2xl text-white'>Todos</Text>
      </View>
      <View className='p-4 flex-1'>
        {newTodos[0] ? (
          newTodos.map((todo) => {
            return (
              <View
                key={todo.id}
                className='px-2 py-1 w-full border-4 rounded-lg bg-white flex flex-row justify-between items-center mb-2'
              >
                <Text className='text-slate-900 break-all w-9/12' key={todo.id}>
                  {todo.value}
                </Text>
                <View className='flex flex-row gap-4 items-center'>
                  <Pressable
                    onPress={() => dispatch(deleteTodo({ id: todo.id }))}
                  >
                    <Ionicons
                      name='remove-circle-outline'
                      size={26}
                      color='#0f172a'
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => dispatch(toggleTodo({ id: todo.id }))}
                  >
                    <Ionicons
                      name='checkmark-circle-outline'
                      size={26}
                      color={todo.completed ? '#008000' : '#d1d5db'}
                    />
                  </Pressable>
                </View>
              </View>
            );
          })
        ) : (
          <View className='flex-1 h-full w-full items-center justify-center'>
            <MaterialIcons name='emoji-emotions' size={200} color='#0f172a' />
          </View>
        )}
      </View>
      <View className='p-4 w-full flex flex-row justify-between'>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Ionicons
            name='arrow-back-circle-outline'
            size={48}
            color='#0f172a'
          />
        </Pressable>
        <Pressable onPress={() => (offset.value = -128)}>
          <Ionicons name='add-circle-outline' size={48} color='#0f172a' />
        </Pressable>
      </View>
      <Animated.View
        style={animatedStyles}
        className='absolute left-0 -bottom-32 w-full flex rounded-t-xl bg-slate-500 p-4'
      >
        <View className='flex flex-row justify-evenly items-center'>
          <TextInput
            onChange={(e) => {
              setText(e.nativeEvent.text);
            }}
            value={text}
            className='bg-white rounded-md w-2/3 px-1 py-2'
            placeholder='Todo giriniz'
          />
        </View>
        <Pressable
          onPress={() => {
            offset.value = 0;
            dispatch(addTodo({ value: text }));
            setText('');
          }}
          className='flex items-center justify-center mt-4'
        >
          <View className='bg-green-500 rounded-md p-2 w-2/3 flex items-center'>
            <Text className='text-white'>Ekle</Text>
          </View>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
export default SecondPage;
