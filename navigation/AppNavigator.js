import { NavigationContainer } from "@react-navigation/native";
import { UserMainNavigation } from "./FeedbackNavigation";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <UserMainNavigation />
    </NavigationContainer>
  );
};

export default AppNavigator;
