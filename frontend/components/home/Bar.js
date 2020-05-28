import React, { Component } from 'react';
import { Text, ListItem, Left, Body } from 'native-base';

export default class Bar extends Component {
    render() {
        return (
            <ListItem
                button
                noIndent
                style={{ height: this.props.height, backgroundColor: 'white' }}
                onPress={this.props.onPress}
            >
                <Left>
                    <Text>{this.props.title}</Text>
                </Left>
                <Body>
                    <Text style={{ color: '#737373', textAlign: 'right' }}>
                        {this.props.value}
                    </Text>
                </Body>
            </ListItem>
        );
    }
}
