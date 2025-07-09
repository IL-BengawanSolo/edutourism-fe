import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { Alert, AlertTitle } from "@/components/ui/alert";

const ErrorAlert = ({ error }) => {
  return (
    <Alert variant="destructive" className="bg-state-error/10 text-state-error">
      <FontAwesomeIcon
        icon={faCircleExclamation}
        className="text-state-error"
        size="lg"
      />
      <AlertTitle className="font-semibold">{error}</AlertTitle>
    </Alert>
  );
};

export default ErrorAlert;
