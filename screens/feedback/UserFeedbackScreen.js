import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Button, CheckBox, Image, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";

import { globalHeight } from "../../constants/globalWidth";
import { isTablet, isWeb } from "../../constants/device";

import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import useImageUpload from "../../components/hooks/useImageUpload";

import * as feedbackActions from "../../store/newFeedback/newFeedbackActions";

const UserFeedbackScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState(0);
  const [emailError, setemailError] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [notes, setNotes] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorArray, setErrorArray] = useState([]);

  const { pickAndUploadImage, imageUrl, progress } = useImageUpload(
    `${name.trim()}-image.jpg`,
    `${name.trim()}-image/images`
  );

  const handleImageUpload = async () => {
    const url = await pickAndUploadImage();
    if (url) {
      setImageURL(url);
    }
  };

  // check if the email is valid setEmailError
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    if (
      name.length > 0 &&
      email.length > 0 &&
      phone.length > 0 &&
      project.length > 0 &&
      feedback.length > 0 &&
      title.length > 0 &&
      feedbackTitle.length > 0 &&
      imageURL.length > 0 &&
      stars > 0 &&
      isAgree
    ) {
      setFormIsValid(true);
    } else {
      // create an error array that shows the user which fields are missing
      let errorArray = [];
      if (name.length === 0) {
        errorArray.push("Name");
        setFormIsValid(false);
      }
      if (email.length === 0) {
        errorArray.push("Email");
        setFormIsValid(false);
      }
      if (phone.length === 0) {
        errorArray.push("Phone");
        setFormIsValid(false);
      }
      if (project.length === 0) {
        errorArray.push("Project");
        setFormIsValid(false);
      }
      if (feedback.length === 0) {
        errorArray.push("Feedback");
        setFormIsValid(false);
      }
      if (title.length === 0) {
        errorArray.push("Title");
        setFormIsValid(false);
      }
      if (stars === 0) {
        errorArray.push("Stars");
        setFormIsValid(false);
      }
      if (feedbackTitle === 0) {
        errorArray.push("Feedback Title");
        setFormIsValid(false);
      }
      if (!isAgree) {
        errorArray.push("Agree");
      }
      if (imageURL.length === 0) errorArray.push("Image");
      setFormIsValid(false);
    }
  }, [name, email, project, feedback, title, stars, isAgree, imageURL]);

  // check if the email is valid setEmailError
  useEffect(() => {
    if (email.length > 0) {
      if (!validateEmail(email)) {
        setemailError("Please enter a valid email");
        setEmailHasError(true);
      } else {
        setemailError("");
        setEmailHasError(false);
      }
    }
  }, [email]);

  const dispatch = useDispatch();

  const submit = () => {
    setIsLoading(true);

    if (!formIsValid) {
      setIsLoading(false);
      return;
    }

    const newFeedback = {
      name,
      email,
      phone,
      project,
      feedback,
      feedbackTitle,
      title,
      imageURL,
      stars,
      isAgree,
      notes,
    };

    dispatch(feedbackActions.addNewFeedback(newFeedback));

    setIsLoading(false);

    setName("");
    setEmail("");
    setPhone("");
    setProject("");
    setFeedback("");
    setFeedbackTitle("");
    setTitle("");
    setImageURL("");
    setStars(0);
    setIsAgree(false);
    setNotes("");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <View style={styles.starsLogo}>
        <Image
          source={require("../../assets/icons/stars.png")}
          style={styles.stars}
        />
      </View>
      <ScrollView
        scrollEnabled={true}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>
          Thank you for taking the time to give us your feedback, your feedback
          is very important to us, and we are planning to use it to enhance our
          services and products. Please fill in the form below and let us know
          what you think.
        </Text>
        <View style={styles.inputs}>
          <CustomInput
            label="Name"
            rightIcon={
              <FontAwesome name="user" size={24} color={Colors.gold} />
            }
            getValue={(value) => setName(value)}
            errorMessage={errorArray.includes("Name") ? "Name is required" : ""}
            showError={errorArray.includes("Name")}
          />
          <CustomInput
            label="Position"
            rightIcon={
              <MaterialCommunityIcons
                name="select-place"
                size={24}
                color={Colors.gold}
              />
            }
            getValue={(value) => setTitle(value)}
            errorMessage={
              errorArray.includes("Position") ? "Position is required" : ""
            }
            showError={errorArray.includes("Position")}
          />
          <CustomInput
            label="Email"
            rightIcon={<Entypo name="email" size={24} color={Colors.gold} />}
            getValue={(value) => setEmail(value)}
            errorMessage={
              emailHasError ? emailError : "" || "Email is required"
            }
            showError={errorArray.includes("Email")}
          />
          <CustomInput
            label="Phone"
            rightIcon={
              <MaterialIcons name="phone" size={24} color={Colors.gold} />
            }
            getValue={(value) => setPhone(value)}
            errorMessage={
              errorArray.includes("Phone") ? "Phone is required" : ""
            }
            showError={errorArray.includes("Phone")}
          />
          <CustomInput
            label="Website/Project"
            rightIcon={
              <MaterialIcons name="web" size={24} color={Colors.gold} />
            }
            getValue={(value) => setProject(value)}
            errorMessage={
              errorArray.includes("Project") ? "Project is required" : ""
            }
            showError={errorArray.includes("Project")}
          />
          <View style={styles.inputContainer}>
            <Button
              buttonStyle={{ backgroundColor: "transaprent" }}
              title="Upload Your Image"
              titleStyle={styles.buttonText}
              onPress={handleImageUpload}
            />
            {errorArray.includes("Image") && (
              <Text style={styles.error}>Image is required</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text
              style={[styles.label, { fontWeight: "bold", marginBottom: 15 }]}
            >
              Rate Us
            </Text>
            <View style={[styles.row, { padding: 15 }]}>
              <Pressable
                onPress={() => setStars(1)}
                style={
                  stars === 1 ? styles.selectedStars : styles.starsContainer
                }
              >
                <Text
                  style={stars === 1 ? styles.selectedNumber : styles.starsText}
                >
                  1
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setStars(2)}
                style={
                  stars === 2 ? styles.selectedStars : styles.starsContainer
                }
              >
                <Text
                  style={stars === 2 ? styles.selectedNumber : styles.starsText}
                >
                  2
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setStars(3)}
                style={
                  stars === 3 ? styles.selectedStars : styles.starsContainer
                }
              >
                <Text
                  style={stars === 3 ? styles.selectedNumber : styles.starsText}
                >
                  3
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setStars(4)}
                style={
                  stars === 4 ? styles.selectedStars : styles.starsContainer
                }
              >
                <Text
                  style={stars === 4 ? styles.selectedNumber : styles.starsText}
                >
                  4
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setStars(5)}
                style={
                  stars === 5 ? styles.selectedStars : styles.starsContainer
                }
              >
                <Text
                  style={stars === 5 ? styles.selectedNumber : styles.starsText}
                >
                  5
                </Text>
              </Pressable>
            </View>
            {errorArray.includes("Stars") && (
              <Text style={styles.error}>Rating is required</Text>
            )}
          </View>
          <CustomInput
            label="Feedback"
            getValue={(text) => setFeedback(text)}
            multiline
            numberOfLines={5}
            rightIcon={
              <MaterialIcons name="feedback" size={24} color={Colors.gold} />
            }
            errorMessage={
              errorArray.includes("Feedback") ? "Feedback is required" : ""
            }
            showError={errorArray.includes("Feedback")}
          />
          <CustomInput
            label="Now give your feedback a title"
            getValue={(text) => setFeedbackTitle(text)}
            rightIcon={
              <MaterialIcons name="title" size={24} color={Colors.gold} />
            }
            errorMessage={
              errorArray.includes("Feedback Title")
                ? "Feedback Title is required"
                : ""
            }
            showError={errorArray.includes("Feedback Title")}
          />
          <View style={styles.inputContainer}>
            <View style={[styles.row]}>
              <Text style={styles.label}>
                I agree to use my image and feedback on{" "}
                <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
                  Codex Technology FZE
                </Text>{" "}
                website
              </Text>
              {
                <CheckBox
                  checked={isAgree}
                  checkedColor={Colors.primary}
                  onPress={() => setIsAgree(!isAgree)}
                  uncheckedColor={Colors.gold}
                />
              }
            </View>
            {errorArray.includes("Agree") && (
              <Text style={styles.error}>We need your agreement</Text>
            )}
          </View>
          <CustomInput
            label="Notes"
            placeholder="Please add any additional notes that you would like us to know"
            multiline
            numberOfLines={5}
            rightIcon={
              <MaterialIcons name="notes" size={24} color={Colors.gold} />
            }
            getValue={(value) => setNotes(value)}
          />
          <Button
            buttonStyle={styles.submitButton}
            title="Submit"
            titleStyle={[styles.buttonText, { color: "#ccc" }]}
            onPress={submit}
            loading={isLoading}
            disabled={!formIsValid}
            loadingStyle={{ color: Colors.white }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    color: Colors.white,
    fontFamily: "main",
    fontSize: globalHeight("2%"),
    fontStyle: "italic",
    textAlign: "center",
    padding: globalHeight("2%"),
    fontWeight: "bold",
    width: isWeb() ? "50%" : "90%",
    alignSelf: "center",
    lineHeight: 25,
  },
  logo: {
    height: globalHeight("12%"),
    width: globalHeight("8%"),
    marginTop: globalHeight("4%"),
    marginLeft: globalHeight("4%"),
  },
  starsLogo: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: Colors.gold,
    borderWidth: 2.5,
    padding: 15,
    borderRadius: "50%",
    height: globalHeight("9%"),
    width: globalHeight("9%"),
  },
  stars: {
    height: globalHeight("2%"),
    width: globalHeight("7%"),
  },
  buttonStyle: {
    width: isTablet() ? "70%" : isWeb() ? "40%" : "90%",
    alignSelf: "center",
    marginTop: globalHeight("3%"),
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.gold,
    borderWidth: 2,
  },
  buttonText: {
    color: Colors.primary,
    fontFamily: "main",
    fontSize: globalHeight("2%"),
    fontStyle: "italic",
    fontWeight: "bold",
  },
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
  label: {
    color: Colors.primary,
    fontFamily: "main",
    fontSize: globalHeight("2%"),
    fontStyle: "italic",
    width: "85%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitButton: {
    width: "20%",
    alignSelf: "center",
    marginTop: globalHeight("3%"),
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderColor: Colors.gold,
    borderWidth: 2,
    marginBottom: globalHeight("10%"),
  },
  starsContainer: {
    padding: 15,
    borderRadius: "50%",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: Colors.yellow,
  },
  selectedStars: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: "50%",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: Colors.yellow,
  },
  starsText: {
    color: Colors.primary,
    fontSize: globalHeight("2.5%"),
    fontWeight: "bold",
  },
  selectedNumber: {
    color: Colors.yellow,
    fontSize: globalHeight("2.5%"),
    fontWeight: "bold",
  },
  error: {
    color: "#ff0000",
    fontSize: globalHeight("2%"),
    fontFamily: "main",
    textAlign: "center",
    marginVertical: globalHeight("1%"),
    fontWeight: "bold",
  },
});

export default UserFeedbackScreen;
