import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/PostActions';
import Post from '../Post/Post';

class Feed extends Component {
  state = {
    posts: []
  };

  //Busca as postagens através da função fetchPosts()
  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        posts: nextProps.posts.posts
      });
    }
  }

  renderPosts() {
    if (this.state.posts === undefined || this.state.posts.length === 0) {
      return (
        <View>
          <Text>Você ainda não tem postagens, que tal adicionar uma?</Text>
        </View>
      );
    } else {
      const arrayPosts = Object.values(this.state.posts);
      const keysPosts = Object.keys(this.state.posts);

      return arrayPosts.map((post, i) => {
        return <Post {...post} key={keysPosts[i]} postKey={keysPosts[i]} />;
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.ScrollContainer}>{this.renderPosts()}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.post
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Feed);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  ScrollContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});