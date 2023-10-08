function duplicateZeros(arr) {
  const n = arr.length;
  let i = 0;

  while (i < n) {
    if (arr[i] === 0) {
      for (let j = n - 1; j > i; j--) {
        arr[j] = arr[j - 1];
      }
      if (i + 1 < n) {
        arr[i + 1] = 0;
      }
      i += 2; 
    } else {
      i++;
    }
  }
}

const arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
duplicateZeros(arr1);
console.log(arr1); 

const arr2 = [1, 2, 3];
duplicateZeros(arr2);
console.log(arr2);
