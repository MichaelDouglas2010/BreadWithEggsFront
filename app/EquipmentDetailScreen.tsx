import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

  // Access the route parameters (e.g., equipmentId)
  const { equipmentId } = route.params;

  return (
    <View>
      <Text>Equipment Detail Screen</Text>
      <Text>Equipment ID: {equipmentId}</Text>
      
      {/* Button to navigate to another screen */}
      <Button
        title="Go to Another Screen"
        onPress={() => navigation.navigate('AnotherScreen')}
      />
    </View>
  );
};

export default EquipmentDetailScreen;
