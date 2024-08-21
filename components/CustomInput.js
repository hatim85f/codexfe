import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input } from "react-native-elements";
import Colors from "../constants/Colors";
import { isTablet, isWeb } from "../constants/device";
import { globalHeight } from "../constants/globalWidth";

const CustomInput = (props) => {
  const { rightIcon, getValue, label, errorMessage, showError } = props;

  const [value, setValue] = useState("");

  useEffect(() => {
    getValue(value);
  }, [value]);

  return (
    <View>
      <Input
        {...props}
        label={label}
        labelStyle={styles.label}
        onChangeText={(text) => setValue(text)}
        value={value}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        inputMode="text"
        rightIcon={() => <View style={styles.iconContainer}>{rightIcon}</View>}
        errorMessage={showError ? errorMessage : null}
        errorStyle={styles.errorStyle}
      />
      {/* {showError && <Text style={styles.errorStyle}>{errorMessage}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: isWeb() ? "40%" : isTablet() ? "70%" : "90%",
    alignSelf: "center",
    marginTop: globalHeight("3%"),
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.gold,
    borderWidth: 2,
    padding: 5,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: "50%",
    width: globalHeight("6%"),
    height: globalHeight("6%"),
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.primary,
    fontFamily: "main",
    fontSize: globalHeight("2%"),
    fontStyle: "italic",
  },
  input: {
    color: Colors.primary,
    fontFamily: "main",
    fontSize: globalHeight("2%"),
    fontWeight: "bold",
  },
  errorStyle: {
    color: "#ff0000",
    fontSize: globalHeight("2%"),
    fontFamily: "main",
    textAlign: "center",
    marginVertical: globalHeight("1%"),
    fontWeight: "bold",
  },
});

export default CustomInput;
