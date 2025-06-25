import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { router } from 'expo-router';

// Define the type for your stack's navigation parameters
type RootStackParamList = {
  EquipmentDetail: { equipmentId: string };
  AnotherScreen: undefined;
};

type EquipmentDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EquipmentDetail'
>;

type EquipmentDetailScreenRouteProp = RouteProp<RootStackParamList, 'EquipmentDetail'>;

const EquipmentDetailScreen = () => {
  const navigation = useNavigation<EquipmentDetailScreenNavigationProp>();
  const route = useRoute<EquipmentDetailScreenRouteProp>();

  const { equipmentId } = route.params;

  return (
    <View>
      <Text>Equipment Detail Screen</Text>
      <Text>Equipment ID: {equipmentId}</Text>
      
      {/* Button to navigate to another screen */}
      <Button
        title="Go to Another Screen"
        onPress={() => router.push('../components/tabelas/EquipamentDetail')}
      />
    </View>
  );
};

export default EquipmentDetailScreen;
