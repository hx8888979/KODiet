import React, { Component } from 'react';
import { Image } from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Label,
    StyleProvider,
    Text,
    Title,
    Toast,
    Col,
    Row,
} from 'native-base';
import styles from '../../styles';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';
import { serverDomain } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
const PushNotification = require('react-native-push-notification');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isPasswordFocus: false,
        };
        this.handlePasswordFocus = this.handlePasswordFocus.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin() {
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        fetch(serverDomain + 'login/', { method: 'POST', body: data })
            .then(response => response.json())
            .then(loginMessage => {
                if (loginMessage.isLogin) {
                    Toast.show({
                        text: 'Login successfully!',
                        duration: 3000,
                        style: { backgroundColor: '#50ACDF' },
                    });
                    this.props.toHome(
                        loginMessage.sessionID,
                        loginMessage.nickname
                    );
                    this.props.username(this.state.username);
                    AsyncStorage.setItem(
                        '@loginState',
                        JSON.stringify({
                            sessionID: loginMessage.sessionID,
                            username: this.state.username,
                            nickname: loginMessage.nickname,
                        }),
                        error => {}
                    );
                    this.props.onSwitchPage('home');
                } else if (
                    !loginMessage.isUserFound &&
                    loginMessage.isUserFound != null
                ) {
                    Toast.show({
                        text: 'Username does not exist',
                        duration: 3000,
                        style: { backgroundColor: '#50ACDF' },
                    });
                } else if (!loginMessage.isPasswordCorrect) {
                    Toast.show({
                        text: 'Password is incorrect',
                        duration: 3000,
                        style: { backgroundColor: '#50ACDF' },
                    });
                }
            })
            .catch(reason => console.log(reason));
    }

    handlePasswordFocus() {
        this.setState({ isPasswordFocus: true });
    }

    handlePasswordBlur(e) {
        this.setState({ isPasswordFocus: false });
    }

    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header>
                        <Body>
                            <Title>Log in</Title>
                        </Body>
                    </Header>
                    <Content>
                        <Image
                            source={
                                this.state.isPasswordFocus
                                    ? require('../../resources/images/Bilibili_password_pic.png')
                                    : require('../../resources/images/Bilibili_username_pic.png')
                            }
                            style={{
                                width: '100%',
                                height: 102,
                            }}
                            resizeMode={'contain'}
                        />
                        <Form>
                            <Item fixedLabel>
                                <Label
                                    style={[styles.inputTitle, { width: 220 }]}
                                >
                                    Username
                                </Label>
                                <Input
                                    placeholder={'your username/email'}
                                    onChangeText={username =>
                                        this.setState({ username })
                                    }
                                    clearButtonMode={'while-editing'}
                                />
                            </Item>
                            <Item fixedLabel last>
                                <Label
                                    style={[styles.inputTitle, { width: 220 }]}
                                >
                                    Password
                                </Label>
                                <Input
                                    placeholder={'Please enter password'}
                                    onChangeText={password =>
                                        this.setState({ password })
                                    }
                                    secureTextEntry={true}
                                    onFocus={this.handlePasswordFocus}
                                    onBlur={this.handlePasswordBlur}
                                    clearButtonMode={'while-editing'}
                                />
                            </Item>
                        </Form>
                        <Row style={{ height: 20 }} />
                        <Row>
                            <Col size={5} />
                            <Col size={40}>
                                <Button
                                    bordered
                                    style={styles.textCenter}
                                    onPress={() =>
                                        this.props.onSwitchPage('signup')
                                    }
                                >
                                    <Text>Sign up</Text>
                                </Button>
                            </Col>
                            <Col size={5} />
                            <Col size={40}>
                                <Button
                                    primary
                                    style={styles.textCenter}
                                    disabled={
                                        this.state.password.length === 0 ||
                                        this.state.username.length === 0
                                    }
                                    onPress={this.handleLogin}
                                >
                                    <Text>Log in</Text>
                                </Button>
                            </Col>
                            <Col size={5} />
                        </Row>
                        <Row>
                            <Button
                                onPress={() => {
                                    PushNotification.localNotificationSchedule({
                                        message: 'for program only',
                                        title: 'Time to fit',
                                        date: new Date(Date.now() + 10 * 1000),
                                    });
                                }}
                            >
                                <Text>Test</Text>
                            </Button>
                        </Row>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}
