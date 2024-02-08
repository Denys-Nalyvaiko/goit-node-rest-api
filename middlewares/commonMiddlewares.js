import * as commonServices from "../services/commonServices.js";

export const checkNecessaryKeysAvailability = (req, _, next, keys) => {
  commonServices.checkNecessaryKeysAvailability(req.body, keys);
  next();
};
