import prisma from "../../prisma/prisma";

// Array of major Indian cities
const indianCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Surat",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Coimbatore",
  "Agra",
  "Madurai",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Howrah",
  "Ranchi",
  "Gwalior",
  "Jabalpur",
  "Vijayawada",
  "Jodhpur",
  "Raipur",
  "Kota",
  "Guwahati",
  "Chandigarh",
  "Thiruvananthapuram",
  "Solapur",
  "Tiruchirappalli",
  "Bareilly",
  "Moradabad",
];
const usernames = [
  "IndiGem",
  "DesiDreamer",
  "BharatExplorer",
  "NamasteSoul",
  "DilSeDosti",
  "SaffronSpirit",
  "ChaiLover",
  "JalebiQueen",
  "SpiceGuru",
  "CurryConnoisseur",
  "BollywoodFanatic",
  "RangoliArtist",
  "TablaMaster",
  "SamosaCraver",
  "KarmaYogi",
  "YogaJunkie",
  "SareeAddict",
  "TigerTamer",
  "ElephantRider",
  "HennaEnthusiast",
  "LotusBloom",
  "KohlEyed",
  "PunjabiMunda",
  "GaneshaBhakt",
  "VibrantSaree",
  "IndianWanderlust",
  "BhangraBeats",
  "RoyalMaharaja",
  "DesiDancer",
  "MasalaChai",
  "SilkSari",
];

const domains = [
  "gmail.com",
  "yahoo.com",
  "reddit.com",
  "amazon.com",
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "linkedin.com",
  "netflix.com",
  "youtube.com",
];

// Function to generate a random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random email address
function generateEmail(username, domain) {
  return `${username}@${domain}`;
}
function generateRandomPhoneNumber() {
  let phoneNumber = "9"; 

  for (let i = 1; i < 10; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }

  return phoneNumber;
}

// Function to generate random user data
function generateUser(i) {
  const username = usernames[i];
  const domain = domains[getRandomInt(0, domains.length - 1)];
  const email = generateEmail(username, domain);
  const password = "12345678";
  const city = indianCities[getRandomInt(0, indianCities.length - 1)];

  return {
    email,
    mobile: generateRandomPhoneNumber(),
    city: city,
    age: getRandomInt(18, 60),
    username,
    password,
    role: "CLIENT",
    createdAt: new Date()
  };
}

export default async function handler(req, res) {
  try {
    // Generate 30 users
    for (let i = 0; i < usernames.length; i++) {
      const userData = generateUser(i);

      // Create the user in the database
      await prisma.user.create({
        data: userData,
      });
    }

    console.log("Data generation completed!");
    res.json({
      message: "users done",
    });
  } catch (error) {
    console.error("Error generating data:", error);
  }
}
