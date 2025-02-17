import React from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import { TextInput, View, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { inputStyles, pill_styles } from "./constants";
import { card_styles_extended } from "@gcVigilantes/pages/VisitaInfo/constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { HeaderActionButton } from "../HeaderActionButton/HeaderActionButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  app_text_body,
  app_text_h3,
  app_text_title_normal,
} from "@gcVigilantes/utils/default.styles";

type EditVehiclesProps = {
  id: string;
  driver: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  plate: string;
  attachedFiles: string[];
  estatusVisita: string;
  handleOnChange: (id: string, key: string, value: string) => void;
  onAttachCallback: (id: string) => void;
  onViewAttachments: (id: string) => void;
  handleClose: () => void;
};

export const EditVehicles = ({
  id,
  brand,
  driver,
  model,
  year,
  color,
  plate,
  attachedFiles,
  estatusVisita,
  handleOnChange,
  onAttachCallback,
  onViewAttachments,
  handleClose,
}: EditVehiclesProps) => {
  const { innerSpinner } = useSelector((state: RootState) => state.ui);
  const handleOpenLibrary = () => {
    onAttachCallback(id);
  };

  return (
    <View key="container-edit-vehicle" style={card_styles_extended}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "5%",
          marginBottom: "2%",
        }}
      >
        <HeaderActionButton
          icon="times-circle"
          color={app_colors.ligth_bg}
          onPress={handleClose}
        />
      </View>
      <TextInput
        style={inputStyles}
        onChangeText={(driver: string) =>
          handleOnChange(id, "conductor", driver)
        }
        value={driver}
        placeholder="Conductor"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(brand: string) => handleOnChange(id, "marca", brand)}
        value={brand}
        placeholder="Marca del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(model: string) => handleOnChange(id, "modelo", model)}
        value={model}
        placeholder="Modelo del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(year: string) => handleOnChange(id, "anio", year)}
        value={year}
        placeholder="Año del vehículo"
        keyboardType="numeric"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(color: string) => handleOnChange(id, "color", color)}
        value={color}
        placeholder="Color del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(plate: string) => handleOnChange(id, "placas", plate)}
        value={plate}
        placeholder="Matrícula del vehículo"
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {estatusVisita.includes("Activa") && (
          <TouchableOpacity style={pill_styles} onPress={handleOpenLibrary}>
            <Text
              style={[
                app_text_title_normal,
                {
                  color: app_colors.text_gray,
                  display: "flex",
                  alignItems: "flex-start",
                },
              ]}
            >
              <Fontisto
                name="plus-a"
                size={app_text_body.fontSize}
                color={app_colors.text_gray}
              />
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            {
              position: "relative",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: 200,
              marginLeft: 10,
            },
          ]}
          onPress={() => {
            onViewAttachments(id);
          }}
        >
          <Fontisto
            name="picture"
            style={{ marginRight: 10 }}
            size={app_text_h3.fontSize}
            color={app_colors.text_gray}
          />
          <Text
            style={[
              app_text_body,
              {
                color: app_colors.text_gray,
                display: "flex",
                alignItems: "flex-start",
              },
            ]}
          >
            {attachedFiles.length}
          </Text>
        </TouchableOpacity>
        {innerSpinner && (
          <ActivityIndicator size="small" color={app_colors.text_gray} />
        )}
      </View>
    </View>
  );
};
