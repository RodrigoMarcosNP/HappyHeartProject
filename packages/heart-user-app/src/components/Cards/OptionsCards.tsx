import React, { memo, useCallback } from "react";
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultIcon from '@/assets/avatar-user-default.png';
import { useDispatch } from "react-redux";
import { addCurrentScreen } from "@/src/store/ducks/screens";
import { useBackPage } from "@/src/hooks/useBackPage";

type ItemProps = {
  title: string;
  icon?: ImageSourcePropType;
  onNavigate: () => void;
};

const OptionsCardWrapper = memo(({ title, icon, onNavigate }: ItemProps) => (
  <TouchableOpacity style={styles.gridCardWrapper} onPress={onNavigate}>
    <View style={styles.cardContent}>
      <Image style={styles.cardIcon} source={icon || DefaultIcon} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
));

type OptionsCardsProps = {
  data: { optionName: string; icon?: ImageSourcePropType; screenName: string; }[];
  navigation: any;
};

export const OptionsCards = ({ data, navigation }: OptionsCardsProps) => {
  const dispatch = useDispatch();
  const useNavHook = useBackPage(navigation);

  const navigateToScreen = (screenName: string) => {
    useNavHook(screenName)
    dispatch(addCurrentScreen({screenStack: screenName}))
  };

  const renderItem = ({ item }: { item: { optionName: string; icon?: ImageSourcePropType; screenName: string; } }) => (
    <OptionsCardWrapper
      title={item.optionName}
      icon={item.icon}
      onNavigate={() => navigateToScreen(item.screenName)}
    />
  );

  return (
    <View style={styles.cardsWrapper}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.optionName}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardsWrapper: {
    flex: 1,
    padding: 0,
  },
  flatListContent: {
    paddingVertical: 0,
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
