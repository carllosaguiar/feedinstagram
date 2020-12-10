import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { addPost } from '../../actions/PostActions';
import { Actions } from 'react-native-router-flux';

class ConfigPost extends Component {
  state = {
    description: '',
    location: ''
  };

  onChangeDescription = text => {
    this.setState({
      description: text
    });
  };

  onChangeLocation = text => {
    this.setState({
      location: text
    });
  };

  onAddPost = () => {
    this.props.addPost(this.props.image, this.state.location, this.state.description);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.image }} style={styles.image} />
        <View style={styles.propContainer}>
          <Text>Dê uma descrição a essa imagem!</Text>
          <Input
            styles={styles.input}
            placeholder="Descrição..."
            value={this.state.description}
            onChange={this.onChangeDescription.bind(this)}
          />
        </View>
        <View style={styles.propContainer}>
          <Text>Em qual local?</Text>
          <Input
            styles={styles.input}
            placeholder="Local..."
            value={this.state.location}
            onChange={this.onChangeLocation.bind(this)}
          />
        </View>
        <Button textButton="Adicionar Postagem" onPress={this.onAddPost.bind(this)} />
        <TouchableOpacity onPress={() => Actions.pop()}>
          <View>
            <Text>Retornar</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  image: state.post.post
});

export default connect(
  mapStateToProps,
  { addPost }
)(ConfigPost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15
  },
  image: {
    width: '100%',
    height: 300
  },
  input: {
    borderRadius: 0,
    backgroundColor: 'white',
    borderColor: 'white',
    borderBottomColor: 'grey'
  },
  propContainer: {
    justifyContent: 'flex-start',
    margin: 10
  }
});