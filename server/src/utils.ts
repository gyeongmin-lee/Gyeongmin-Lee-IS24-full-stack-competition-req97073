import products from "../data/products";
import { MAX_DEVELOPERS } from "./constants";
import { Methodology, NewProductEntry } from "./types";

let newProductId = Math.max(...products.map((p) => p.productId)) + 1;

export const getNewProductId = (): number => {
  return newProductId++;
};

export const toNewProductEntry = (object: unknown): NewProductEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "productName" in object &&
    "productOwnerName" in object &&
    "Developers" in object &&
    "scrumMasterName" in object &&
    "startDate" in object &&
    "methodology" in object
  ) {
    const newEntry: NewProductEntry = {
      productName: parsePersonName(object.productName),
      productOwnerName: parsePersonName(object.productOwnerName),
      Developers: parseDevelopers(object.Developers),
      scrumMasterName: parsePersonName(object.scrumMasterName),
      startDate: parseDate(object.startDate),
      methodology: parseMethodology(object.methodology),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isMethodology = (param: string): param is Methodology => {
  return Object.values(Methodology)
    .map((v) => v.toString())
    .includes(param);
};

const parsePersonName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const parseMethodology = (methodology: unknown): Methodology => {
  if (!methodology || !isString(methodology) || !isMethodology(methodology)) {
    throw new Error("Incorrect or missing methodology: " + methodology);
  }

  return methodology;
};

const parseDevelopers = (developers: unknown): string[] => {
  if (
    !developers ||
    typeof developers !== "object" ||
    !Array.isArray(developers)
  ) {
    // we will just trust the data to be in correct form
    throw new Error("Incorrect or missing developers: " + developers);
  }

  if (developers.length > MAX_DEVELOPERS) {
    throw new Error(
      `Too many developers: ${developers.length} (max ${MAX_DEVELOPERS})`
    );
  }

  if (developers.length === 0) {
    throw new Error("No developers");
  }

  return developers as string[];
};
