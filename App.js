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
    return (
      <View style={styles.peopleItem}>
        <TouchableOpacity>
          <Text
            style={{
              ...styles.blueText,
              fontWeight: "bold",
              fontSize: 24,
              marginBottom: 8
            }}
          >
            {this.props.person.name}
          </Text>
          <Text style={styles.blueText}>
            <Text style={{ fontWeight: "bold" }}>Birth Year: </Text>{" "}
            {this.props.person.birth_year}
          </Text>
          <Text style={styles.blueText}>
            <Text style={{ fontWeight: "bold" }}>Gender: </Text>{" "}
            {this.props.person.gender}
          </Text>
        </TouchableOpacity>
      </View>
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
        console.log("res.data", res.data);
        this.setState({ people: [...res.data] });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <View
          style={{ ...styles.centeredContainer, width: "100%", height: "5%" }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#ffa72b" }}>
            S T A R    W A R S    N A T I V E
          </Text>
        </View>
        <View
          style={{ ...styles.startContainer, width: "100%", height: "95%" }}
        >
          <TouchableOpacity onPress={() => this.getPeople()}>
            <Text style={{ ...styles.blueText, fontWeight: "bold" }}>
              Fetch All Star Wars People
            </Text>
          </TouchableOpacity>
          {!!this.state.people && !!this.state.people.length && (
            <PeopleList people={this.state.people} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 48,
    backgroundColor: "#2f2f2f"
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  startContainer: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  blueText: {
    color: "#437bb4",
    fontSize: 16
  },
  peopleItem: {
    flex: 1,
    backgroundColor: "#c4d4e0",
    width: 400,
    marginBottom: 16,
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#000",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1
  }
});
