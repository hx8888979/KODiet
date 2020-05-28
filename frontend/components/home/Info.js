import React, { Component } from 'react';
import { Text, Col, Row, Thumbnail, Icon, Button } from 'native-base';
import styles from '../../styles';
import { serverDomain } from '../../config';

export default class Info extends Component {
    render() {
        return (
            <Row style={{ backgroundColor: 'white', height: 90 }}>
                <Col
                    size={1}
                    style={[
                        styles.textCenter,
                        { marginLeft: 30, marginBottom: 10 },
                    ]}
                >
                    <Thumbnail
                        source={{
                            uri: serverDomain + 'media/' + this.props.avatar,
                        }}
                        large
                    />
                </Col>
                <Col
                    size={5}
                    style={{
                        justifyContent: 'center',
                        marginLeft: 30,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ lineHeight: 40, fontSize: 18 }}>
                        {this.props.nickname}
                        &nbsp;&nbsp;
                        <Text
                            style={{
                                color: 'orange',
                                fontWeight: 'bold',
                                fontSize: 10,
                                marginLeft: 10,
                            }}
                        >
                            LV{this.props.level}
                        </Text>
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#737373',
                        }}
                    >
                        Coin: {this.props.coin}
                    </Text>
                </Col>
                <Col size={1}>
                    <Button
                        transparent
                        style={{ marginTop: 25 }}
                        onPress={this.props.goto}
                    >
                        <Icon
                            name={'arrow-forward'}
                            style={{
                                color: '#cccccc',
                                fontSize: 25,
                            }}
                        />
                    </Button>
                </Col>
            </Row>
        );
    }
}
