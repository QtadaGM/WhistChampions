import { showMessage, MessageOptions } from "react-native-flash-message";
const successMessage = (description = "", message = "Success") => {
  showMessage({
    message: message,
    description: description,
    type: "success",
  });
};

const errorMessage = (description = "", message = "Error") => {
  showMessage({
    message: message,
    description: description,
    type: "danger",
  });
};

const toastMessage = (description = "", message = "Info", type = "info") => {
  showMessage({
    message: message,
    description: description,
    type: type,
  });
};
const keyExtractor = (item, index) => index.toString();
const GlobalMethods = {
  toastMessage,
  errorMessage,
  successMessage,
  keyExtractor,
};

export default GlobalMethods;