import Axios from "axios";

//www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=YOURKEYWORD&type=video&key=AIzaSyCkEM5aow9Xn_DCVxWSdUUK49roWwo7M60

const youtubeApiUrl = "https://www.googleapis.com/youtube/v3/search";

export const fetchVideos = (country) => {
  const q = `coronavirus+${country ? country : "global"}`;
  const url = `${youtubeApiUrl}?part=snippet&maxResults=20&q=${q}&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  return Axios.get(url).then((response) => {
    return response.data.items;
  });
};
