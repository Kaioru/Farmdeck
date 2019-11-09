import React, { Component } from "react";
import axios from "axios";

const POST = async () => {
  try {
    const response = await axios.post("localhost:5001/panel/ToggleComponent", {
      type: "motor"
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export default class Farmdeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    axios.get("https://reqres.in/api/users?page=2").then(
      result => {
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.data.map(item => (
            <li key={item.id}>
              {item.first_name} {item.last_name}
            </li>
          ))}
        </ul>
      );
    }
  }
}
export { POST };
