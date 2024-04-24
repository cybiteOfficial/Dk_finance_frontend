import { Typography, styled ,Chip, TextField} from "@mui/material";
import { theme } from "../theme";

const StyledChip = styled(Chip)(
  ({
    theme,
    propColor,
    propFontSize,
    propFontWeight,
    propWidth,
    propHeight,
    propBorderRadius,
    propBackgroundColor,
  }) => ({
    "&.MuiChip-root": {
      width: propWidth,
      height: propHeight,
      borderRadius: propBorderRadius,
      backgroundColor: propBackgroundColor,
      color: propColor,
      fontSize: propFontSize,
      fontWeight: propFontWeight,
    },
  })
);

export const CommonChip = (props) => {
  return (
    <StyledChip
      {...props}
      propFontSize={props.propFontSize}
      propFontWeight={props.propFontWeight}
      propColor={props.propColor}
      label={props.label}
      propWidth={props.propWidth}
      propHeight={props.propHeight}
      propBorderRadius={props.propBorderRadius}
      propBackgroundColor={props.propBackgroundColor}
      onClick={props.handleClick}
    />
  );
};

export const StyledTypography = ({color, align,variant, weight, children }) => {
  return (
    <Typography
      align={align && align}
      variant={variant}
      style={{
        fontWeight: weight ? weight : 400,
        color: color ? color : theme.palette.black.main,
      }}
    >
      {children}
    </Typography>
  );
};

export const sortingFilter = [
  {
    id: "1",
    label: "Newest to oldest",
    selectedBgColor: theme.palette.primary.main,
    selectedColor: theme.palette.white.main,
    bgColor: theme.palette.lightSecondaryV3.main,
    color: theme.palette.primary.main,
  },
  {
    id: "2",
    label: "Oldest to newest",
    selectedBgColor: theme.palette.primary.main,
    selectedColor: theme.palette.white.main,
    bgColor: theme.palette.lightSecondaryV3.main,
    color: theme.palette.primary.main,
  },
  {
    id: "3",
    label: "Sort by date",
    selectedBgColor: theme.palette.primary.main,
    selectedColor: theme.palette.white.main,
    bgColor: theme.palette.lightSecondaryV3.main,
    color: theme.palette.primary.main,
  },
];
