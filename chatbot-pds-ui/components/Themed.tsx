/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type ButtonProps = ThemeProps & {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const borderColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <DefaultTextInput
      style={[
        styles.input,
        {
          color,
          borderColor,
          backgroundColor,
        },
        style,
      ]}
      placeholderTextColor={useThemeColor({}, "tabIconDefault")}
      {...otherProps}
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    title,
    onPress,
    disabled,
    style,
    textStyle,
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    disabled ? "background" : "background",
  );
  const textColor = useThemeColor({}, "text");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...otherProps}
    >
      <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 46,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    height: 46,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
