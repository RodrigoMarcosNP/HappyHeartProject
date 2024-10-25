import { useCallback } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { addCurrentScreen, backScreen, getCurrentScreen, Screen } from "@/src/store/ducks/screens";

export function useBackPage(navigation: NavigationProp<any>) {
  const dispatch = useDispatch();
  const currentScreen: Screen | string = useSelector((state: RootState) => getCurrentScreen(state.screens, 2));

  const navigateToScreen = useCallback((toScreen?: string, isBack?: boolean) => {
    console.log(currentScreen)
    if (toScreen) {
      navigation.navigate(toScreen);
      dispatch(addCurrentScreen({ screenStack: toScreen }));
    } else {
      navigation.navigate(currentScreen.screenStack);
      dispatch(backScreen());
    }
  }, [dispatch, navigation, currentScreen]);

  return navigateToScreen;
}
