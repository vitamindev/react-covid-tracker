import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

function ListItemLink({ icon, primary, to }) {
  const renderLink = useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default ListItemLink;
