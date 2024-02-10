import HttpError from "../helpers/HttpError.js";

export const checkNecessaryKeysAvailability = (body, keys) => {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  const hasNeccessaryKeys = Object.keys(body).every((element) =>
    keys.includes(element)
  );

  if (!hasNeccessaryKeys) {
    throw HttpError(400, `Only ${keys} field(s) can be updated`);
  }
};
