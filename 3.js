/**
 * getStringInCharacter
 * @param {*} string 
 * @param {*} character 
 * @returns index dari character yang ditemukan di dalam string, jika tidak ada maka return -1
 * 
 * Logic:
 * mencari indeks dari character yang ada di dalam string adalah perintah berulang. Maka dilakukan refactor menjadi fungsi saja
 * getStringInCharacter
 * 
 * lalu, mengubah conditional 
 * if (best case) { ... } else { return '' } 
 * menjadi
 * if (worst_case) return '';
 * ... 
 */

function getStringInCharacter(string, character) {
  let index = string.indexOf(character);
  return index;
}

function findFirstStringInBracket(str){
  if (str.length == 0) return '';
  let firstBracketFoundIndex = getStringInCharacter(str, "(");
  if (firstBracketFoundIndex == -1) return '';
  let wordsAfterFirstBracket = str.substr(firstBracketFoundIndex);
  if (wordsAfterFirstBracket.length <= 1) return '';
  wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);
  let closingBracketFoundIndex = getStringInCharacter(wordsAfterFirstBracket, ")");
  if (closingBracketFoundIndex == -1) return '';

  return wordsAfterFirstBracket.substr(0, closingBracketFoundIndex);
  /*
  if(str.length > 0){
  let indexFirstBracketFound = str.indexOf("(");
  if(indexFirstBracketFound >= 0){
  let wordsAfterFirstBracket = str.substr( indexFirstBracketFound );
  if(wordsAfterFirstBracket){
  wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);
  let indexClosingBracketFound = wordsAfterFirstBracket.indexOf(")");
  if(indexClosingBracketFound >= 0){
  return wordsAfterFirstBracket.substring(0,
 indexClosingBracketFound);
  }
  else{
  return '';
  }
  }else{
  return '';
  }
  }else{
  return '';
  }
  }else{
  return '';
  }*/
 }

 console.log(findFirstStringInBracket("(FizzBuzz)AAA)"))