import express from 'express';
import axios from 'axios';
import { isIP } from 'is-ip';  // Importing isIP function from 'is-ip' package
import dns from 'dns/promises';
import cors from 'cors';  // Import the cors module

const app = express();
const PORT = 3001;

// Use cors middleware to enable CORS
app.use(cors());

const validateInput = (input) => {
  if (isIP(input)) {  // Usage of isIP function to validate IP address
    console.log('Valid IP address');
  } else {
    console.log('Invalid IP address or domain name');
  }
};


const getGeolocation = async (query) => {
  if (!query) {
    throw new Error('Query parameter is required');
  }

  try {
    const response = await axios.get(`http://ip-api.com/json/${query}`);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch geolocation: HTTP status ${response.status}`);
    }
    if (response.data && response.data.countryCode) {
      return response.data.countryCode;
    } else {
      throw new Error('Unexpected response format from geolocation API');
    }
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch geolocation: ${error.response.data}`);
    }
    throw new Error(`Failed to fetch geolocation: ${error.message}`);
  }
};

export default getGeolocation;

app.get('/test-server-location', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      throw new Error('URL parameter is required');
    }
    const hostname = new URL(url).hostname;
    validateInput(hostname);  // Validate the input here
    const ipAddress = isIP(hostname) ? hostname : await dns.lookup(hostname).then(res => res.address);
    const countryCode = await getGeolocation(ipAddress);
    res.json({ testedWebsite: url, serverLocation: countryCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
