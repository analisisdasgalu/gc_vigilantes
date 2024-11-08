import React, { useEffect, useRef, useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import RadioGroup from "@gcVigilantes/Components/RadioGroup";

import { TextInput, View, Image, Text, Modal } from "react-native";
import {
  MainInfoProps,
  NEW_VEHICLE,
  TIPO_INGRESO,
  card_styles,
  getVehicleInfoStyles,
  mainInfoVehicleScrollStyles,
} from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ScrollView } from "react-native-gesture-handler";
import { VehicleCard } from "@gcVigilantes/Components/VehicleCard/VehicleCard";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { VehiclesResType } from "@gcVigilantes/store/Visita/types";
import { EditVehicles } from "@gcVigilantes/Components/EditVehicles/EditVehicles";
import { AddVehicle } from "@gcVigilantes/Components/AddVehicle/AddVehicle";
import { getLabelApp } from "@gcVigilantes/utils";

export const TipoVisitasIcon: { [key: string]: React.ReactNode } = {
  ["1"]: <FontAwesome name="user" size={18} color="darkgray" />,
  ["3"]: <FontAwesome name="truck" size={18} color="darkgray" />,
  ["2"]: <FontAwesome name="wrench" size={18} color="darkgray" />,
  ["Vehículo"]: <FontAwesome name="car" size={24} color="darkgray" />,
  Peatonal: <FontAwesome5 name="walking" size={24} color="darkgray" />,
  single: <FontAwesome name="user" size={24} color="darkgray" />,
  multiple: (
    <MaterialCommunityIcons
      name="account-multiple-plus"
      size={24}
      color="black"
    />
  ),
};

export const MainInfo = ({
  tipoVisita,
  tipoIngreso,
  nombreVisita,
  catalogVisitas,
  catalogIngreso,
  visitVehicles,
  estatus,
  newVisita,
  handleOnChange,
}: MainInfoProps) => {
  const preferences = useSelector((state: RootState) => state.preferences);
  const [nombreVisitaState, setNombreVisita] = useState<string>(nombreVisita);
  // -- Disabling and enabling Cards
  const [tipoVisitaDisabled, setTipoVisitaDisabled] = useState<boolean>(
    !newVisita
  );
  const [tipoIngresoDisabled, setTipoIngresoDisabled] = useState<boolean>(
    !newVisita
  );
  const [nombreVisitaDisabled, setNombreVisitaDisabled] = useState<boolean>(
    !newVisita
  );
  // -- Vehicle info

  const [vehicles, setVehicles] = useState<VehiclesResType[]>([]);
  const [editVehicle, setEditVehicle] = useState<VehiclesResType>(NEW_VEHICLE);

  useEffect(() => {
    setVehicles(visitVehicles);
  }, [visitVehicles]);

  const handleAddVehicle = () => {
    const tmpVehicle: VehiclesResType = {
      ...NEW_VEHICLE,
      id: Math.random().toString(36).substr(2, 9),
    };
    setVehicles([...vehicles, tmpVehicle]);
  };

  return (
    <View>
      <View style={card_styles}>
        <CardTitle
          title="tipo de visita"
          uppercase
          editIcon={estatus !== 0}
          handleEdit={() => setTipoVisitaDisabled(false)}
        />
        <RadioGroup
          selectedValue={tipoVisita}
          disabled={tipoVisitaDisabled}
          options={catalogVisitas.map((catalog) => ({
            id: catalog.id,
            label: catalog.tipo_visita,
            icon: TipoVisitasIcon[catalog.id] as unknown as React.ReactNode,
          }))}
          handleChange={(value: string) => {
            handleOnChange("idTipoVisita", value);
          }}
        />
      </View>
      <View style={card_styles}>
        <CardTitle
          title="Nombre"
          uppercase
          editIcon={estatus !== 0}
          handleEdit={() => setNombreVisitaDisabled(false)}
        />
        {nombreVisitaDisabled && (
          <Text style={{ color: app_colors.text_dark, left: 10 }}>
            {nombreVisita}
          </Text>
        )}
        {!nombreVisitaDisabled && (
          <TextInput
            style={{
              width: "90%",
              height: 40,
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              left: 10,
              color: app_colors.text_dark,
            }}
            value={nombreVisita}
            placeholder="Ingrese aqui el nombre de la visita"
            onChangeText={(value: string) => {
              setNombreVisita(value);
              handleOnChange("nombre", value);
            }}
            autoCapitalize="words"
            maxLength={50}
          />
        )}
      </View>
      <View
        style={[
          card_styles,
          {
            marginBottom: 0,
            zIndex: 1,
          },
        ]}
      >
        <CardTitle
          title="Tipo ingreso"
          uppercase
          editIcon={estatus !== 0}
          handleEdit={() => setTipoIngresoDisabled(false)}
        />
        <RadioGroup
          options={catalogIngreso.map((catalog) => ({
            id: catalog.id,
            label: catalog.tipo_ingreso,
            icon: TipoVisitasIcon[
              catalog.tipo_ingreso
            ] as unknown as React.ReactNode,
          }))}
          selectedValue={tipoIngreso}
          disabled={tipoIngresoDisabled}
          handleChange={(value: string) => {
            handleOnChange("idTipoIngreso", value);
          }}
        />
      </View>
      {tipoIngreso == TIPO_INGRESO.VEHICULO.id && (
        <>
          <ScrollView
            style={[
              mainInfoVehicleScrollStyles,
              { height: vehicles.length === 0 || newVisita ? 0 : 200 },
            ]}
            contentContainerStyle={getVehicleInfoStyles(vehicles)}
            horizontal
          >
            {!newVisita &&
              vehicles?.map((vehicle: VehiclesResType, index: number) => (
                <VehicleCard
                  key={vehicle.placas}
                  id={index}
                  vehicle={{ ...vehicle, id: vehicle.id || "" }}
                  openModal={() => setEditVehicle({ ...vehicle })}
                />
              ))}
          </ScrollView>
          <View style={card_styles}>
            <CardTitle
              title={
                vehicles.length === 0
                  ? getLabelApp(
                      preferences.language,
                      "app_screen_visit_info_register_vehicle"
                    )
                  : getLabelApp(
                      preferences.language,
                      "app_screen_visit_info_edit_vehicle"
                    )
              }
              uppercase
              editIcon={false}
            />
            <AddVehicle onPress={handleAddVehicle} />
            {vehicles.map((vehicle) => (
              <EditVehicles
                id={vehicle.id || ""}
                driver={vehicle.conductor}
                brand={vehicle.marca}
                model={vehicle.modelo}
                year={vehicle.anio}
                color={vehicle.color}
                plate={vehicle.placas}
                handleOnChange={(id: string, key: string, value: string) => {
                  const currVehicle = vehicles.find(
                    (vehicle) => vehicle.id === id
                  );
                  if (currVehicle) {
                    const tmp = { ...currVehicle, [key]: value };
                    const newVehicles = vehicles.map((vehicle) =>
                      vehicle.id === id ? tmp : vehicle
                    );
                    setVehicles(newVehicles);
                    handleOnChange("vehicles", newVehicles as any);
                  }
                }}
                handleClose={() => {
                  const vehicles = visitVehicles.filter(
                    (v) => v.id !== vehicle.id
                  );
                  setVehicles(vehicles);
                }}
              />
            ))}
          </View>
        </>
      )}
      {editVehicle?.id && (
        <EditVehicles
          id={editVehicle.id || ""}
          driver={editVehicle.conductor}
          brand={editVehicle.marca}
          model={editVehicle.modelo}
          year={editVehicle.anio}
          color={editVehicle.color}
          plate={editVehicle.placas}
          handleOnChange={(id: string, key: string, value: string) => {
            const currVehicle = vehicles.find((vehicle) => vehicle.id === id);
            if (currVehicle) {
              const tmp = { ...currVehicle, [key]: value };
              const newVehicles = vehicles.map((vehicle) =>
                vehicle.id === id ? tmp : vehicle
              );
              setVehicles(newVehicles);
              handleOnChange("vehicles", newVehicles as any);
            }
          }}
          handleClose={() => {
            const vehicles = visitVehicles.filter(
              (v) => v.id !== editVehicle.id
            );
            setVehicles(vehicles);
          }}
        />
      )}
    </View>
  );
};

MainInfo.defaultProps = {
  catalogVisitas: [],
  catalogIngreso: [],
  tipoVisita: "",
  tipoIngreso: "",
  nombreVisita: "",
  visitVehicles: [],
  estatus: 0,
  newVisita: false,
  handleOnChange: () => {},
};
