import React, { Component } from 'react';
import { Text, Image, View, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { selectImage } from '../../actions/PostActions';
import Header from '../../components/common/Header';
import { Actions } from 'react-native-router-flux';
import { YellowBox } from 'react-native'
import data from '../../../dataIMG.json';

class AddPost extends Component {
  state = {
    image: '',
    imageSelected: false
  };

  onSelectImage = ({ item }) => {
    this.setState({
      image: item.url,
      imageSelected: true
    });
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity style={styles.miniImageContainer} onPress={() => this.onSelectImage({ item })}>
      <View>
        <Image source={{ uri: item.url }} style={styles.miniImage} />
      </View>
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => item.name;

  renderImage = () => {
    if (!this.state.imageSelected) {
      return (
        <View style={styles.mainImageContainer}>
          <Text>Selecione uma imagem</Text>
        </View>
      );
    }

    return (
      <View style={styles.mainImageContainer}>
        <Image source={{ uri: this.state.image }} style={styles.mainImage} />
      </View>
    );
  };

  onPressNext = () => {
    this.props.selectImage(this.state.image);
    Actions.configPost();
  };

  onPressCancel = () => {
    Actions.pop();
  };

  renderHeader = () => {
    if (this.state.imageSelected) {
      return <Header title="Adicionar Post" onNext={this.onPressNext.bind(this)} onCancel={this.onPressCancel.bind(this)} />;
    }

    return <Header title="Adicionar Post" onCancel={this.onPressCancel.bind(this)} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView>
          {this.renderImage()}
          <FlatList data={data.images} keyExtractor={this._keyExtractor} renderItem={this._renderItem} numColumns={3} />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  { selectImage }
)(AddPost);

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  mainImageContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainImage: {
    width: '100%',
    height: '100%',
    margin: 5
  },
  miniImageContainer: {
    width: 100,
    height: 100,
    margin: 5
  },
  miniImage: {
    width: 100,
    height: 100
  }
});
