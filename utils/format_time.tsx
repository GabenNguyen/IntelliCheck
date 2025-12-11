// Utility function to format a date string into a relative time description

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString); // convert string to Date object
  const now = new Date();
  const differentInMilliSec = now.getTime() - date.getTime(); // difference in milliseconds
  const differentInDays = Math.floor(differentInMilliSec / (1000 * 60 * 60 * 24)); // convert to days

  if (differentInDays === 0) return "today";
  if (differentInDays === 1) return "yesterday";
  if (differentInDays < 7) return `${differentInDays} days ago`;
  if (differentInDays < 14) return "1 week ago";
  if (differentInDays < 30) return `${Math.floor(differentInDays / 7)} weeks ago`;
  if (differentInDays < 60) return "1 month ago";
  return `${Math.floor(differentInDays / 30)} months ago`;
}

export default formatRelativeTime;