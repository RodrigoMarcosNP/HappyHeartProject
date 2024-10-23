import { useCallback } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { backScreen, getCurrentScreen } from "../store/ducks/screens";

interface BackPageProps {
  navigation: NavigationProp<any>;
}

export function BackPage({ navigation }: BackPageProps) {
  const dispatch = useDispatch();

  const currentScreen = useSelector((state: RootState) => getCurrentScreen(state.screens, 2));

  const navigateToScreen = useCallback(() => {
    if (currentScreen && currentScreen.screenStack) {
      navigation.navigate(currentScreen.screenStack);
      dispatch(backScreen());
    }
  }, [dispatch, currentScreen, navigation])

  return navigateToScreen;
};
