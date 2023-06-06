import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useState } from "react";
import { View, Button, Text, Alert } from "react-native";

import colors from "../../utils/colors";
import { styles } from "./styles";

const LocationSelector = ({ onLocation }) => {
  const [pickedLocation, setPickedLocation] = useState(null);

  const verifyPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permisos insuficientes", "Necesitamos permisos para obtener la ubicacion", [
        { text: "Ok" },
      ]);
      return false;
    }

    return true;
  };

  const onHandlerGetLocation = async () => {
    const isLocationPermission = await verifyPermissions();
    if (!isLocationPermission) return;
    const location = await getCurrentPositionAsync({
      timeout: 5000,
    });

    const { latitude, longitude } = location.coords;

    setPickedLocation({ lat: latitude, lng: longitude });
    onLocation({ lat: latitude, lng: longitude });
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedLocation ? (
          <Text>No hay ubicacion seleccionada</Text>
        ) : (
          <Text>{`latitud: ${pickedLocation.lat}, longitude: ${pickedLocation.lng}`}</Text>
        )}
      </View>
      <Button title="Obtener ubicacion" onPress={onHandlerGetLocation} color={colors.primary} />
    </View>
  );
};

export default LocationSelector;
