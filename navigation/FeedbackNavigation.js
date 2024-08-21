import { createStackNavigator } from "@react-navigation/stack";
import UserFeedbackScreen from "../screens/feedback/UserFeedbackScreen";

const UserNavigation = createStackNavigator();

export const UserMainNavigation = () => {
  return (
    <UserNavigation.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <UserNavigation.Screen
        name="UserFeedback"
        component={UserFeedbackScreen}
        options={{
          title: "User Feedback",
        }}
      />
    </UserNavigation.Navigator>
  );
};
