const validateTopicLogic = (input: string): boolean => {
  // Reject ONLY numbers
  if (/^\d+$/.test(input)) return false;

  // Must start with letter
  if (!/^[A-Za-z]/.test(input)) return false;

  // At least one vowel
  if (!/[aeiou]/i.test(input)) return false;

  // At least one consonant
  if (!/[bcdfghjklmnpqrstvwxyz]/i.test(input)) return false;

  // No 3 repeating chars
  if (/(.)\1{2,}/.test(input)) return false;

  // No repeated words pattern
  if (/(\w{2,})\1/.test(input)) return false;

  return true;
};

export default validateTopicLogic;