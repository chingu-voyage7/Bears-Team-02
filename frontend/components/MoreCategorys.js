import React from 'react'

class MoreCategorys extends React.Component {
  render() {
    const moreCategorysStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 250px)',
      gridTemplateRows: '1fr 1fr',
      justifyItems: 'center',
      justifyContent: 'center',
      border: 'none',
      boxShadow: '0px -24px 3px -24px #AAAAAA',
      opacity: this.props.open ? '1' : '0',
      maxHeight: this.props.open ? '100%' : '0',
      overflow: 'hidden',
      padding: this.props.open ? '15px' : '0 15px',
      transition: 'all 0.2s',
      backgroundColor: '#DDDDDD',
    }
    const moreCategorysButtonStyle = {
      color: 'blue',
      paddingTop: '5%',
    }
    return (
      <div style={moreCategorysStyle}>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
        <a style={moreCategorysButtonStyle} href="http://google.com">
          test
        </a>
      </div>
    )
  }
}
export default MoreCategorys
