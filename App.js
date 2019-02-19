import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Picker
} from "react-native";

const API = "http://localhost:7777/api";

class PeopleListItem extends React.Component {
  render() {
    return (
      <View style={styles.cardContainer}>
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

  apiFetch = (personId = null) => {
    let url = !!personId ? `${API}/people/${personId}` : `${API}/people/`;
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("res.data", res.data);
        this.setState({ people: [...res.data] });
      })
      .catch(err => console.log(err));
  };
  getPeople = () => {
    return this.apiFetch();
  };
  getPerson = personId => {
    this.setState({ personId });
    return this.apiFetch(personId);
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <View
          style={{ ...styles.centeredContainer, width: "100%", height: "5%" }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffa72b" }}>
            S T A R W A R S N A T I V E
          </Text>
        </View>
        <View
          style={{ ...styles.startContainer, width: "100%", height: "95%" }}
        >
          <View style={{ ...styles.cardContainer, width: "90%" }}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => this.getPeople()}
                style={styles.button}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Fetch All Star Wars People
                </Text>
              </TouchableOpacity>
              <Picker
                selectedValue={this.state.personId}
                style={{ height: 50, width: "100%" }}
                itemStyle={{ ...styles.blueText, height: 45 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.getPerson(itemValue)
                }
              >
                <Picker.Item label="Luke Skywalker" value="1" />
                <Picker.Item label="C-3PO" value="2" />
                <Picker.Item label="R2-D2" value="3" />
                <Picker.Item label="Darth Vader" value="4" />
                <Picker.Item label="Leia Organa" value="5" />
              </Picker>
            </View>
          </View>
          {!!this.state.people && !!this.state.people.length && (
            <View style={{ width: "90%", height: "100%" }}>
              <PeopleList people={this.state.people} />
            </View>
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
  button: {
    width: "90%",
    backgroundColor: "#437bb4",
    borderColor: "#000",
    borderBottomWidth: 0,
    borderRadius: 4,
    padding: 8
  },
  cardContainer: {
    backgroundColor: "#c4d4e0",
    width: "100%",
    marginBottom: 16,
    borderRadius: 4,
    padding: 8,
    borderColor: "#000",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1
  }
});
