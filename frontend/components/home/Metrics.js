import React, { Component } from 'react';
import { Text, Col, Row } from 'native-base';
import styles from '../../styles';

export default class Metrics extends Component {
    render() {
        return (
            <Row
                style={[
                    styles.textCenter,
                    {
                        backgroundColor: 'white',
                        height: 60,
                        marginTop: 10,
                    },
                ]}
            >
                {this.props.metrics.map(pair => (
                    <Col size={1} key={pair.key}>
                        <Text style={{ textAlign: 'center', lineHeight: 30 }}>
                            {pair.val}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 12,
                                color: '#737373',
                            }}
                        >
                            {pair.key}
                        </Text>
                    </Col>
                ))}
            </Row>
        );
    }
}
