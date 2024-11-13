import React, { useCallback } from "react";
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultIcon from '@/assets/avatar-user-default.png';
import { useBackPage } from "@/src/hooks/useBackPage";

type ItemProps = {
  title: string;
  icon?: ImageSourcePropType;
  screenName: string;
  itemData: string,
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
  data: {
    itemData: any; title: string; screenName: string; icon?: ImageSourcePropType; 
}[];
  navigation: any; 
};

export const Cards = ({ data, navigation }: CardsProps) => {
  const useNavHook = useBackPage(navigation);
  console.log(data)
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
            onNavigate={() => useNavHook(item.screenName, item.itemData)} itemData={""}          />
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
