import React, { Component } from 'react';
import { Text, Col, Row } from 'native-base';

export default class Card extends Component {
    render() {
        return (
            <Row
                style={{
                    height: this.props.height,
                    marginTop: 10,
                }}
            >
                <Col>
                    <Row
                        size={this.props.topScale}
                        style={{
                            backgroundColor: 'white',
                            marginBottom: 2,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                paddingLeft: 20,
                                borderBottomColor: 'grey',
                            }}
                        >
                            {this.props.title}
                        </Text>
                    </Row>
                    <Row
                        size={this.props.botScale}
                        style={{ backgroundColor: 'white' }}
                    >
                        {this.props.children}
                    </Row>
                </Col>
            </Row>
        );
    }
}
