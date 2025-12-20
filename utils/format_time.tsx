// Utility function to format a date string into a relative time description

function formatRelativeTime(dateString: string): string {
  const quizSavedDate = new Date(dateString); // convert string to Date object
  const now = new Date();

  // compare the date from the start of the date (local time)
  const startOfQuizSavedDate = new Date(
    quizSavedDate.getFullYear(),
    quizSavedDate.getMonth(),
    quizSavedDate.getDate()
  );
  const startOfNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const differentInMilliSec =
    startOfNow.getTime() - startOfQuizSavedDate.getTime(); // difference in milliseconds
  const differentInDays = Math.floor(
    differentInMilliSec / (1000 * 60 * 60 * 24)
  ); // convert to days

  if (differentInDays === 0) return "today";
  if (differentInDays === 1) return "yesterday";
  if (differentInDays < 7) return `${differentInDays} days ago`;
  if (differentInDays < 14) return "1 week ago";
  if (differentInDays < 30)
    return `${Math.floor(differentInDays / 7)} weeks ago`;
  if (differentInDays < 60) return "1 month ago";
  return `${Math.floor(differentInDays / 30)} months ago`;
}

export default formatRelativeTime;
