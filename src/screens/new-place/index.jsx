import { useState } from "react";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";

import { ImageSelector, LocationSelector } from "../../components";
import { savePlace } from "../../store/place.slice";
import colors from "../../utils/colors";
import { styles } from "./styles";

const NewPlace = ({ navigation }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState(null);

  const onHandlerChangeText = (text) => {
    setText(text);
  };

  const onHandlerSubmit = () => {
    dispatch(savePlace({ title: text, image }));
    navigation.navigate("Places");
  };

  const onImage = (imageUri) => {
    setImage(imageUri);
  };
  const onLocation = (location) => {
    setLocation(location);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nombre nueva ubicacion</Text>
        <TextInput
          style={styles.input}
          placeholder="Nuevo Mexico, CDMX 12345"
          onChangeText={onHandlerChangeText}
          value={text}
        />
        <ImageSelector onImage={onImage} />
        <LocationSelector onLocation={onLocation} />
        <Button title="Grabar direccion" color={colors.primary} onPress={onHandlerSubmit} />
      </View>
    </ScrollView>
  );
};

export default NewPlace;
