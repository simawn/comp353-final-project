import React from "react";

// Material UI
import {
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
  },
}));

function LoadingScreen({ message, size, thickness, fullScreen }) {
  const classes = useStyles();

  return (
    <Container maxWidth={fullScreen ? "lg" : false}>
      <Card elevation={fullScreen ? 1 : 0}>
        <CardContent>
          <List>
            <ListItem className={classes.listItem}>
              <CircularProgress variant="indeterminate" size={size} thickness={thickness} />
            </ListItem>
            {message && (
              <ListItem className={classes.listItem}>
                <Typography variant={"subtitle1"} align={"center"}>
                  {message}
                </Typography>
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoadingScreen;
