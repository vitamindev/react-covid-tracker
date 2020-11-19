import {
  Card,
  CardContent,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { convertHexToRGBA, withPlusOrMinus } from "../../../utils";

const CaseInfoTile = ({ label, total, newToday, color }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderTopStyle: "solid",
      borderTopWidth: theme.spacing(1),
      borderColor: color,
    },
    content: {
      textAlign: "center",
    },
    total: {
      color: color,
    },
    new: {
      backgroundColor: convertHexToRGBA(color, 0.25),
    },
  }));

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography gutterBottom>{label}</Typography>
        <Typography gutterBottom variant="h4" className={classes.total}>
          {total.toLocaleString()}
        </Typography>
        <Chip className={classes.new} label={withPlusOrMinus(newToday)} />
      </CardContent>
    </Card>
  );
};

export default CaseInfoTile;
