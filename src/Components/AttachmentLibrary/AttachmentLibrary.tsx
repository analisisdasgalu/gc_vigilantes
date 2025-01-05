import { Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CardTitle } from "../CardTitle/CardTitle";
import Fontisto from "@expo/vector-icons/Fontisto";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { styles } from "./style.default";

export type AttachmentLibraryProps = {
  uris: string[];
  handleClose: () => void;
  onDelete: (uri: string) => void;
};

export const AttachmentLibrary = (props: AttachmentLibraryProps) => {
  return (
    <ScrollView
      contentContainerStyle={{
        maxHeight: 800,
        minHeight: 600,
      }}
    >
      <CardTitle title="Adjuntos" removeIcon handleRemove={props.handleClose} />
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {props.uris.map((uri, index) => (
          <View
            key={index}
            style={{
              padding: 10,
              borderColor: app_colors.red,
              borderWidth: 2,
              width: "50%",
              height: 200,
            }}
          >
            <TouchableOpacity
              style={styles.trashBin}
              onPress={() => props.onDelete(uri)}
            >
              <Fontisto name="trash" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={{ uri }}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
