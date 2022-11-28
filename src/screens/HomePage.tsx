import { Image, Pressable, Button, Text } from 'react-native';
import logo from '../img/todo.png';
import { LinearGradient } from 'expo-linear-gradient';

function HomePage({ navigation }: { navigation: any }) {
  return (
    <LinearGradient
      className='container flex-1 justify-center items-center'
      colors={['#ffffff', '#4dccd3']}
    >
      <Pressable onPress={() => navigation.navigate('SecondPage')}>
        <Image className='w-60 h-48 shadow-md' source={logo} />
      </Pressable>
    </LinearGradient>
  );
}
export default HomePage;
