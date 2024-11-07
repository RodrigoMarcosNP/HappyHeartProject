import { useCallback } from "react";
import { NavigationProp } from "@react-navigation/native";

export function useBackPage(navigation: NavigationProp<any>) {
  const navigateToScreen = useCallback((toScreen?: string, data?: any) => {
    if (toScreen) {
      console.log(data)
      navigation.navigate(toScreen, data);
    }
  }, [navigation]);

  return navigateToScreen;
}
