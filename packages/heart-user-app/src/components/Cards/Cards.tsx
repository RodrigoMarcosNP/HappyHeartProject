import React, { useCallback } from "react";
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultIcon from '@/assets/avatar-user-default.png';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentScreen } from "@/src/store/ducks/screens";
import { RootState } from "@/src/store";
import { useBackPage } from "@/src/hooks/useBackPage";

type ItemProps = {
  title: string;
  icon?: ImageSourcePropType;
  screenName: string;
  onNavigate: () => void;
};

const CardWrapper = React.memo(({ title, icon, onNavigate }: ItemProps) => {
  return (
    <TouchableOpacity style={styles.gridCardWrapper} onPress={onNavigate}>
      <View style={styles.cardContent}>
        <Image style={styles.cardIcon} source={icon || DefaultIcon} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
});

type CardsProps = {
  data: { title: string; icon?: ImageSourcePropType; screenName: string }[];
  navigation: any; 
};

export const Cards = ({ data, navigation }: CardsProps) => {
  const dispatch = useDispatch();
  const currentScreenStack = useSelector((state: RootState) => state.screens.screenStack);
  const navigateToScreen = useCallback((screenName: string) => {
    navigation.navigate(screenName);
    dispatch(addCurrentScreen({ screenStack: screenName }));
  }, [dispatch, currentScreenStack, navigation]);
  const useNavHook = useBackPage(navigation);

  return (
    <View style={styles.cardsWrapper}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <CardWrapper
            title={item.title}
            icon={item.icon}
            screenName={item.screenName}
            onNavigate={() => useNavHook(item.screenName)}
          />
        )}
        keyExtractor={(item) => item.screenName}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardsWrapper: {
    marginTop: 30,
    padding: 10,
    width: '100%',
    height: '100%',
  },
  gridCardWrapper: {
    backgroundColor: 'white',
    width: '48%',
    height: 150,
    borderRadius: 10,
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  cardIcon: {
    height: 36,
    width: 36,
  },
  cardTitle: {
    color: 'black',
    width: '70%',
    fontSize: 17.5,
    paddingTop: 20,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  flatListContent: {
    columnGap: 2,
    rowGap: 2,
  },
});
