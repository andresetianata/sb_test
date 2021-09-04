/**
 * groupingAnagram
 * 
 * Keterangan variabel:
 * listWords = array berisi sekumpulan kata yang di input
 * sortedWord = setiap element dari listWords yang di-sorted.
 * 
 * Logika:
 * Buat tipe data Map sebagai dictionary menampung daftar anagram.
 * Sekelompok kata disebut anagram jika memiliki jumlah huruf dan huruf-huruf di dalamnya sama.
 * Maka solusi yang bisa dilakukan adalah melakukan sorting pada setiap kata di 'listWords', sebagai sortedWord
 * Setelah itu periksa apakah sortedWord ada di dalam Map sebagai key dari Map.
 * Jika ada, maka tambahkan element kata dari listWords ke dalam array yang merupakan value dari key sortedWord.
 * Jika tidak ada, maka masukkan sortedWord tadi sebagai key, dan array berisi element kata dari listWords sebagai value.
 * 
 * Cara menjalankan : node 4.js
 */


function groupingAnagram(listWords) {
  var anagramDictionary = new Map();
  var arrayResult = [];
  for (var x=0;x<listWords.length;x++) {
    var sortedWord = listWords[x].split("").sort().join("");
    if (anagramDictionary.has(sortedWord)) {
      var arrayOfWords = anagramDictionary.get(sortedWord);
      arrayOfWords.push(listWords[x]);
      anagramDictionary.set(sortedWord, arrayOfWords);
    }
    else {
      var arrayOfWords = [];
      arrayOfWords.push(listWords[x]);
      anagramDictionary.set(sortedWord, arrayOfWords);
    }
  }

  anagramDictionary.forEach((value, key, map) => {
    arrayResult.push(value);
  })
  return arrayResult;
}

const result = groupingAnagram(['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']);
console.log(result);