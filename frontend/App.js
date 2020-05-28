/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Root } from 'native-base';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Home from './components/home/Home';
import { serverDomain } from './config';
import InfoSetting from './components/home/InfoSetting';
import Settings from './components/home/Settings';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-community/async-storage';
const PushNotification = require('react-native-push-notification');

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: '',
            dataArray: [],
            username: '',
            sessionID: '',
            avatar: '',
            nickname: '',
            level: 0,
            coin: 0,
            height: 0,
            weight: 0,
            BMI: 0,
        };
        AsyncStorage.getItem('@loginState', (error, result) => {
            if (result) {
                let res = JSON.parse(result);
                this.handleLoginToHome(res.sessionID, res.nickname);
                this.setState({ username: res.username });
                this.handleSwitchPage('home');
                return;
            }
            this.handleSwitchPage('login');
        });
        this.handleSwitchPage = this.handleSwitchPage.bind(this);
        this.handleSessionID = this.handleSessionID.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleLoginToHome = this.handleLoginToHome.bind(this);
        PushNotification.configure({
            onNotification: notification => {
                console.log(notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }

    handleLoginToHome(sessionID, nickname) {
        this.handleSessionID(sessionID);
        this.setState({ nickname: nickname });
        this.handleHome();
    }

    handleSessionID(sessionID) {
        this.setState({ sessionID: sessionID });
    }
    handleHome() {
        const data = new FormData();
        data.append('sessionID', this.state.sessionID);
        fetch(serverDomain + 'home/', { method: 'POST', body: data })
            .then(response => response.json())
            .then(homeMessage => {
                this.setState({
                    avatar: homeMessage.avatar + '?update=' + Date.now(),
                    nickname: homeMessage.nickname,
                    level: homeMessage.level,
                    coin: homeMessage.coin,
                    height: homeMessage.height,
                    weight: homeMessage.weight,
                    BMI: homeMessage.BMI,
                });
                this.setState({
                    dataArray: [
                        {
                            key: 'Avatar',
                            val: this.state.avatar,
                            editable: true,
                        },
                        {
                            key: 'Nickname',
                            val: this.state.nickname,
                            editable: true,
                        },
                        {
                            key: 'Level',
                            val: this.state.level,
                            editable: false,
                        },
                        {
                            key: 'Coin',
                            val: this.state.coin,
                            editable: false,
                        },
                        {
                            key: 'Height',
                            val: this.state.height,
                            editable: true,
                        },
                        {
                            key: 'Weight',
                            val: this.state.weight,
                            editable: true,
                        },
                        {
                            key: 'BMI',
                            val: this.state.BMI,
                            editable: false,
                        },
                    ],
                });
            })
            .catch(reason => console.log(reason));
    }
    handleSwitchPage(nextPage) {
        this.setState({ currentPage: nextPage });
    }
    currentPage() {
        switch (this.state.currentPage) {
            case 'login':
                return (
                    <Login
                        onSwitchPage={this.handleSwitchPage}
                        toHome={this.handleLoginToHome}
                        username={username => {
                            this.setState({ username });
                        }}
                    />
                );
            case 'signup':
                return <Signup onSwitchPage={this.handleSwitchPage} />;
            case 'home':
                return (
                    <Home
                        goto={() => this.setState({ currentPage: 'infoset' })}
                        onSwitchPage={this.handleSwitchPage}
                        nickname={this.state.nickname}
                        avatar={this.state.avatar}
                        level={this.state.level}
                        coin={this.state.coin}
                        height={this.state.height}
                        weight={this.state.weight}
                        BMI={this.state.BMI}
                    />
                );
            case 'infoset':
                return (
                    <InfoSetting
                        back={() => this.setState({ currentPage: 'home' })}
                        onChange={this.handleHome}
                        session={this.state.sessionID}
                        dataArray={this.state.dataArray}
                    />
                );
            case 'settings':
                return (
                    <Settings
                        username={this.state.username}
                        onSwitchPage={this.handleSwitchPage}
                        back={() => this.setState({ currentPage: 'home' })}
                    />
                );
        }
    }

    render() {
        return <Root>{this.currentPage()}</Root>;
    }
}

export default App;
