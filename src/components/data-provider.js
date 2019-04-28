import React, { Children } from "react"

class DataProvider extends React.Component {
  state = { filters: { extension: ["jpg", "png"] } }

  render() {
    return Children.only(this.props.children)
  }
}

export default DataProvider
