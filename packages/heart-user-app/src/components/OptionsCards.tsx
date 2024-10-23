import React, { useCallback } from "react";
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultIcon from '@/assets/avatar-user-default.png';
import { useDispatch } from "react-redux";
import { addCurrentScreen } from "../store/ducks/screens";

type ItemProps = {
  title: string;
  icon?: ImageSourcePropType;
  onNavigate: () => void;
};

const OptionsCardWrapper = React.memo(({ title, icon, onNavigate }: ItemProps) => (
  <TouchableOpacity style={styles.gridCardWrapper} onPress={onNavigate}>
    <View style={styles.cardContent}>
      <Image style={styles.cardIcon} source={icon || DefaultIcon} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
));

type OptionsCardsProps = {
  data: { optionName: string; icon?: ImageSourcePropType; }[];
  navigation: any;
};

export const OptionsCards = ({ data, navigation }: OptionsCardsProps) => {
  const dispatch = useDispatch();

  const navigateToScreen = useCallback((screenName: string) => {
    navigation.navigate(screenName);
    dispatch(addCurrentScreen({ screenStack: screenName }));
  }, [dispatch, navigation]);

  return (
    <View style={styles.cardsWrapper}>
      <FlatList
        data={data}
        numColumns={1}  // Single column layout
        renderItem={({ item }) => (
          <OptionsCardWrapper
            title={item.optionName}
            icon={item.icon}
            onNavigate={() => navigateToScreen(item.optionName)}
          />
        )}
        keyExtractor={(item) => item.optionName}
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
  },
});
