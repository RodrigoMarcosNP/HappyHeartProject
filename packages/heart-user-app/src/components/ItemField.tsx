import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

interface EvaluatorItemProps {
  title: string;
  date: string;
  onPress: () => void;
}

const EvaluatorItem: React.FC<EvaluatorItemProps> = ({ title, date, onPress }) => {
  console.log('')
  return (
    <TouchableOpacity style={styles.evaluatorPersonList} onPress={onPress}>
      <View style={styles.evaluatorItems}>
        <View style={styles.evaluatorImageRow}>
          <Image source={require('@/assets/user-evaluator.png')} style={styles.evaluatorImage} />
          <Text style={styles.evaluatorName}>{title}</Text>
        </View>
      </View>
      <View style={styles.evaluatorItems}>
        <Text style={styles.evaluatorDate}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  evaluatorItems: {
    justifyContent: 'center',
  },
  evaluatorImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  evaluatorImage: {
    width: 65,
    height: 65,
  },
  evaluatorName: {
    justifyContent: 'center',
  },
  evaluatorDate: {
    fontSize: 20,
  },
  evaluatorPersonList: {
    width: '100%',
    flexDirection: 'row',
    height: 75,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
});

export default EvaluatorItem;
