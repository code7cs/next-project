// Helper function to get device information
export function getDevice(userAgent) {
  if (userAgent.match(/iPhone/i)) {
    return "iPhone";
  } else if (userAgent.match(/Android/i)) {
    return "Android";
  } else if (userAgent.match(/iPad/i)) {
    return "iPad";
  } else if (userAgent.match(/Windows Phone/i)) {
    return "Windows Phone";
  } else if (userAgent.match(/Windows/i)) {
    return "Windows PC";
  } else if (userAgent.match(/Macintosh/i)) {
    return "Mac";
  } else if (userAgent.match(/Linux/i)) {
    return "Linux";
  } else {
    return "Unknown Device";
  }
}

// Helper function to get browser information
export function getBrowser(userAgent) {
  if (userAgent.match(/Edge/i)) {
    return "Microsoft Edge";
  } else if (userAgent.match(/Chrome/i)) {
    return "Google Chrome";
  } else if (userAgent.match(/Safari/i)) {
    return "Safari";
  } else if (userAgent.match(/Firefox/i)) {
    return "Mozilla Firefox";
  } else if (userAgent.match(/Opera|OPR/i)) {
    return "Opera";
  } else if (userAgent.match(/Trident/i) || userAgent.match(/MSIE/i)) {
    return "Internet Explorer";
  } else {
    return "Unknown Browser";
  }
}
