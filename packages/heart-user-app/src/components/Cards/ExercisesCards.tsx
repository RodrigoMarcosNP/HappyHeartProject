import React, { useCallback } from "react";
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultIcon from '@/assets/avatar-user-default.png';
import { useDispatch } from "react-redux";
import { addCurrentScreen } from "@/src/store/ducks/screens";

type ItemProps = {
  title: string;
  icon?: ImageSourcePropType;
  onNavigate: () => void;
};

const OExerciseCardWrapper = React.memo(({ title, icon, onNavigate }: ItemProps) => (
  <TouchableOpacity style={styles.gridCardWrapper} onPress={onNavigate}>
    <View style={styles.cardContent}>
      <Image style={styles.cardIcon} source={icon || DefaultIcon} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
));

type ExerciseWrapperProps = {
  data: { exerciseName: string; icon?: ImageSourcePropType; }[];
  navigation: any;
};

export const ExerciseWrapper = ({ data, navigation }: ExerciseWrapperProps) => {
  const dispatch = useDispatch();

  const navigateToScreen = useCallback((screenName: string) => {
    navigation.navigate(screenName);
    dispatch(addCurrentScreen({ screenStack: screenName }));
  }, [dispatch, navigation]);

  return (
    <View style={styles.cardsWrapper}>
      <FlatList
        data={data}
        numColumns={1}
        renderItem={({ item }) => (
          <OExerciseCardWrapper
            title={item.exerciseName}
            icon={item.icon}
            onNavigate={() => navigateToScreen(item.exerciseName)}
          />
        )}
        keyExtractor={(item) => item.exerciseName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardsWrapper: {
    marginTop: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  gridCardWrapper: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    height: 60,
    marginVertical: 0,
  },
  cardIcon: {
    height: 46,
    width: 46,
    marginLeft: 10,
  },
  cardTitle: {
    color: 'black',
    fontSize: 17.5,
    marginLeft: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
});
