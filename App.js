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
      <TouchableOpacity>
        <Text style={{ color: textColor }}>{this.props.person.name}</Text>
      </TouchableOpacity>
    );
  }
}

class PeopleList extends React.Component {
  _keyExtractor = (item, index) => (item.id = `${index}`);

  _renderItem = ({ item }) => <PeopleListItem person={item} />;

  render() {
    console.log("this.props.people", this.props.people);
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
    return fetch(`${API}/people/`)
      .then(res => res.json())
      .then(res => {
        this.setState({ people: [...res.data] });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity onPress={() => this.getPeople()}>
            <Text>Fetch People!</Text>
          </TouchableOpacity>
        </View>
        {!!this.state.people && !!this.state.people.length && (
          <View style={{ flex: 0.5 }}>
            <PeopleList people={this.state.people} />
          </View>
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
