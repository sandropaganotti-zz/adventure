export function isEqual(arr1, arr2){
  let i = arr1.length;
  if (i != arr2.length) return false;
  while (i--) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}