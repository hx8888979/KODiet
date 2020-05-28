import React, { Component } from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    StyleProvider,
    Text,
    Icon,
    Left,
    Right,
    List,
    ListItem,
} from 'native-base';
import styles, { color } from '../../styles';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';
import Bar from './Bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
const PushNotification = require('react-native-push-notification');

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bTime: new Date(),
            lTime: new Date(),
            dTime: new Date(),
            fTime: new Date(),
            settingTimeIdx: -1,
        };
        AsyncStorage.getItem(
            this.props.username + '@mealTime/bTime',
            (error, result) => {
                if (result) {
                    this.setState({ bTime: new Date(result) });
                }
            }
        );
        AsyncStorage.getItem(
            this.props.username + '@mealTime/lTime',
            (error, result) => {
                if (result) {
                    this.setState({ lTime: new Date(result) });
                }
            }
        );
        AsyncStorage.getItem(
            this.props.username + '@mealTime/dTime',
            (error, result) => {
                if (result) {
                    this.setState({ dTime: new Date(result) });
                }
            }
        );
        AsyncStorage.getItem(
            this.props.username + '@fitTime/fTime',
            (error, result) => {
                if (result) {
                    this.setState({ fTime: new Date(result) });
                }
            }
        );
    }

    handleNotificationTime(id, key, message, title, date) {
        PushNotification.cancelLocalNotifications({ id });
        PushNotification.localNotificationSchedule({
            userInfo: { id },
            message,
            title,
            date,
            repeatType: 'day',
        });
    }

    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container style={{ backgroundColor: color.grey }}>
                    <Header>
                        <Left>
                            <Button transparent onPress={this.props.back}>
                                <Icon
                                    name="arrow-back"
                                    style={{
                                        color: 'black',
                                        marginLeft: 15,
                                        fontSize: 25,
                                    }}
                                />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Settings</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <List>
                            <ListItem itemDivider>
                                <Text
                                    style={{ fontWeight: '600', color: 'grey' }}
                                >
                                    Time Setting
                                </Text>
                            </ListItem>
                        </List>
                        <Bar
                            title={'Breakfast'}
                            value={moment(this.state.bTime).format('hh:mm A')}
                            height={50}
                            onPress={() =>
                                this.setState({
                                    settingTimeIdx:
                                        this.state.settingTimeIdx === 0
                                            ? -1
                                            : 0,
                                })
                            }
                        />
                        {this.state.settingTimeIdx === 0 ? (
                            <DateTimePicker
                                value={this.state.bTime}
                                mode={'time'}
                                onChange={(event, date) => {
                                    this.setState({
                                        bTime: new Date(date),
                                    });
                                    AsyncStorage.setItem(
                                        this.props.username + '@mealTime/bTime',
                                        date.toString(),
                                        error => {}
                                    );
                                    this.handleNotificationTime(
                                        'bTime',
                                        '@mealTime/bTime',
                                        'Tap to see menu',
                                        'Time to have Breakfast ~~~',
                                        date
                                    );
                                }}
                            />
                        ) : null}
                        <Bar
                            title={'Lunch'}
                            value={moment(this.state.lTime).format('hh:mm A')}
                            height={50}
                            onPress={() =>
                                this.setState({
                                    settingTimeIdx:
                                        this.state.settingTimeIdx === 1
                                            ? -1
                                            : 1,
                                })
                            }
                        />
                        {this.state.settingTimeIdx === 1 ? (
                            <DateTimePicker
                                value={this.state.lTime}
                                mode={'time'}
                                onChange={(event, date) => {
                                    this.setState({
                                        lTime: new Date(date),
                                    });
                                    AsyncStorage.setItem(
                                        this.props.username + '@mealTime/lTime',
                                        date.toString(),
                                        error => {}
                                    );
                                    this.handleNotificationTime(
                                        'lTime',
                                        '@mealTime/lTime',
                                        'Tap to see menu',
                                        'Time to have Lunch ~~~',
                                        date
                                    );
                                }}
                            />
                        ) : null}
                        <Bar
                            title={'Dinner'}
                            value={moment(this.state.dTime).format('hh:mm A')}
                            height={50}
                            onPress={() =>
                                this.setState({
                                    settingTimeIdx:
                                        this.state.settingTimeIdx === 2
                                            ? -1
                                            : 2,
                                })
                            }
                        />
                        {this.state.settingTimeIdx === 2 ? (
                            <DateTimePicker
                                value={this.state.dTime}
                                mode={'time'}
                                onChange={(event, date) => {
                                    this.setState({
                                        dTime: new Date(date),
                                    });
                                    AsyncStorage.setItem(
                                        this.props.username + '@mealTime/dTime',
                                        date.toString(),
                                        error => {}
                                    );
                                    this.handleNotificationTime(
                                        'dTime',
                                        '@mealTime/dTime',
                                        'Tap to see menu',
                                        'Time to have Dinner ~~~',
                                        date
                                    );
                                }}
                            />
                        ) : null}
                        <Bar
                            title={'Fitness'}
                            value={moment(this.state.fTime).format('hh:mm A')}
                            height={50}
                            onPress={() =>
                                this.setState({
                                    settingTimeIdx:
                                        this.state.settingTimeIdx === 3
                                            ? -1
                                            : 3,
                                })
                            }
                        />
                        {this.state.settingTimeIdx === 3 ? (
                            <DateTimePicker
                                value={this.state.fTime}
                                mode={'time'}
                                onChange={(event, date) => {
                                    this.setState({
                                        fTime: new Date(date),
                                    });
                                    AsyncStorage.setItem(
                                        this.props.username + '@fitTime/fTime',
                                        date.toString(),
                                        error => {}
                                    );
                                    this.handleNotificationTime(
                                        'fTime',
                                        '@fitTime/fTime',
                                        'Tap to play fitness video',
                                        'Time to exercise ~~~',
                                        date
                                    );
                                }}
                            />
                        ) : null}
                        <Button
                            bordered
                            style={[
                                styles.textCenter,
                                { backgroundColor: 'white', marginTop: 20 },
                            ]}
                            onPress={() => {
                                this.props.onSwitchPage('login');
                                AsyncStorage.removeItem(
                                    '@loginState',
                                    error => {}
                                );
                            }}
                        >
                            <Text>Log out</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}
