import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from 'react-native-star-view';

export default class RecommendedMoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      movies: [],
      ngrok_url:"https://2568-106-213-81-133.ngrok-free.app"
    }
  }
  getmovie = ()=> {
    const url = this.state.ngrok_url + "/recommended_movies";
    axios
      .get(url)
      .then((response)=>{
        this.setState({movies: response.data.data});
      })
        .catch((error)=>{
          console.log(error.message);
        });
      }

  renderItems=({item,index})=>{
    return(
      <View style={styles.cardContainer}>
        <Image style={styles.posterImage}
        source={{uri: item.poster_link}}/>
        <View style={styles.movieTitleContainer}>
          <Text style={styles.title}>{item.original_title}</Text>
          <View style={{flexDirection: "row"}}>
            <Text style={styles.subtitle}>{item.duration} mins</Text>
            <Star score={item.rating} style={styles.starStyle}/>
          </View>
        </View>
      </View>
    )
  }
  componentDidMount(){
    this.getmovie()
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
        <FlatList
        data = {this.state.movies}
        renderItem = {this.renderItems}
        keyExtractor = {this.keyExtractor}
        />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderRadius: RFValue(10),
    height: RFValue(200),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(15),
  },
  posterImage: {
    flex: 1,
    borderRadius: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  movieTitleContainer: {
    position: "absolute",
    backgroundColor: "white",
    width:RFValue(250),
    padding: RFValue(10),
    bottom: RFValue(10),
    left: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth:RFValue(2),
    borderColor:"#3c8ed9"
  },
  starStyle: {
    width: RFValue(75),
    height: RFValue(15),
  }
});
