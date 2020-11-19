import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import moment from "moment";
import unescape from "lodash/unescape";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { fetchVideos } from "../../api/youtube-api";

const settings = {
  dots: true,
  centerMode: true,
  // arrows: true,
  // infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
};

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: theme.spacing(3),
      padding: "40px",
      color: "#333",
      background: "#419be0",
    },
    slider: {
      "& .slick-slide": { padding: theme.spacing(1) },
    },
    card: {
      width: 320,
    },
    media: {
      width: 320,
      height: 180,
    },
    title: {
      height: 100,
    },
  };
});

const NewsVideosPanel = ({ country }) => {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const loadVideos = async () => {
      const result = await fetchVideos(country.name);
      setVideos(result);
    };
    loadVideos();
  }, [country]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <div className={classes.root}>
          <Slider {...settings} className={classes.slider}>
            {videos.map((v, index) => {
              return (
                <div key={index}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={v.snippet.thumbnails.medium.url}
                        title={v.snippet.title}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          className={classes.title}
                        >
                          {unescape(v.snippet.title)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {moment(v.snippet.publishedAt).fromNow()}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              );
            })}
          </Slider>
        </div>
      </Grid>
    </Grid>
  );
};

export default NewsVideosPanel;
