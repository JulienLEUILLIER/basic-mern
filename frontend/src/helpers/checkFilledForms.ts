import { RegisterDataWithConfirmation } from "../pages/Register";
import { LoginData } from "../hooks/useAuth";

const checkFilledForms = <T extends RegisterDataWithConfirmation | LoginData> (
  formData: T
): boolean => {
  
  const keys = Object.keys(formData);

  if (!keys.length) {
    return false;
  }

  let allFilled: boolean = true;

  keys.forEach((key) => {
    if (formData[key as keyof T].length === 0) {
      allFilled = false;
    }
  });

  return allFilled;
};

export default checkFilledForms;
