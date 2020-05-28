import Bar from './Bar';
import { Left, List, ListItem, Right, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { serverDomain } from '../../config';

export default class PersonalInfoList extends Component {
    constructor() {
        super();
        this.state = { selectedItemIndex: -1 };
    }

    render() {
        return (
            <List>
                <ListItem
                    button
                    noIndent
                    style={{ height: 100, backgroundColor: 'white' }}
                    onPress={() => {
                        this.props.onPress(0);
                    }}
                >
                    <Left>
                        <Text>{this.props.dataArray[0].key}</Text>
                    </Left>
                    <Right>
                        <Thumbnail
                            style={{ marginRight: 10 }}
                            square
                            large
                            source={{
                                uri:
                                    serverDomain +
                                    'media/' +
                                    this.props.dataArray[0].val,
                            }}
                        />
                    </Right>
                </ListItem>
                {this.props.dataArray.slice(1).map((pair, index) => (
                    <Bar
                        key={pair.key}
                        title={pair.key}
                        value={pair.val}
                        height={50}
                        onPress={() => {
                            this.props.onPress(index + 1);
                        }}
                    />
                ))}
            </List>
        );
    }
}
