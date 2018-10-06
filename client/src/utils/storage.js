//get the storage
export function getFromStorage(key) {
  if (!key) {
    return null;
  }

  try {
    const valueString = localStorage.getItem(key);
    if (valueString) {
      return JSON.parse(valueString);
    }
  } catch (err) {
    return null;
  }
}
//set the item
export function setInStorage(key, object) {
  if (!key) {
    console.error("Error:key is missing");
  }

  try {
    localStorage.setItem(key, JSON.stringify(object));
  } catch (err) {
    console.error(err);
  }
}
