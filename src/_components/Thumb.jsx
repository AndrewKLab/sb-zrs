import React from "react";

export default class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file || typeof nextProps.file === 'string' ) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;
    if (!file) { return null; }
    return (
      <img
        src={typeof file === 'string' ? file : thumb}
        alt={typeof file === 'string' ? '' : file.name}
        className="drag-and-drop-layout-img"
        height={"100%"}
        width={'100%'}
      />
    );

  }
}