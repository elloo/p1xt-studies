// Source: http://www.freecodecamp.com/challenges/bonfire-title-case-a-sentence

// Ensure first letter[0] of each word is capitalized
// Ensure the rest of the word is in lower case

function titleCase(str) 
{
  
  // Split the string into substrings DONE
  str = str.split(" ");
  strT = [];
  
  // Check each word - make sure first letter is capitalized and rest is lower case DONE
  for (var i = 0; i < str.length; i++)
  {
    str[i] = str[i].toLowerCase()
    .replace(/^[a-z]/, function(letter){return letter.toUpperCase();});   
    strT.push(str[i]);
  }
  
  // Join substrings into one string again DONE
  str = strT.join(" "); 
  
  return str;
}

titleCase("I'm a LiTtle tea POT");
