import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";

const API = "http://localhost:7777/api";

class PeopleListItem extends React.Component {
  onFetch = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this.onFetch}>
        <View>
          <Text style={{ color: textColor }}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class PeopleList extends React.Component {
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => <PeopleListItem id={item.id} />;

  render() {
    return (
      <FlatList
        data={this.props.people}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default class App extends React.Component {
  state = { people: [] };
  getPeople = () => {
    return fetch(`${API}/people/`).then(res => {
      console.log('res', res);
      // this.setState({ people: [...res.data] });
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.getPeople()}>
          <Text>Fetch People!</Text>
        </TouchableOpacity>
        {!!this.state.people && !!this.state.people.length && (
          <PeopleList people={this.state.people} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
