import { useCallback } from "react";
import { NavigationProp } from "@react-navigation/native";

export function useBackPage(navigation: NavigationProp<any>) {
  const navigateToScreen = useCallback((toScreen?: string, data?: string[]) => {
    if (toScreen) {
      navigation.navigate(toScreen, data);
    }
  }, [navigation]);

  return navigateToScreen;
}
