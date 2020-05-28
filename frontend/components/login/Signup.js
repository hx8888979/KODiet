import React, { Component } from 'react';
import { Image } from 'react-native';
import {
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Label,
    Body,
    Title,
    Button,
    Text,
    StyleProvider,
    Right,
    Left,
    Toast,
    Col,
    Row,
} from 'native-base';
import styles from '../../styles';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';
import { serverDomain } from '../../config';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            nickname: '',
            password: '',
            confirm: '',
            isPasswordFocus: false,
            isConfirmFocus: false,
            lst: '',
        };
        this.handlePasswordFocus = this.handlePasswordFocus.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
        this.handleConfirmFocus = this.handleConfirmFocus.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }
    handlePasswordFocus() {
        this.setState({ isPasswordFocus: true });
    }
    handlePasswordBlur() {
        this.setState({ isPasswordFocus: false });
    }
    handleConfirmFocus() {
        this.setState({ isConfirmFocus: true });
    }
    handleConfirmBlur() {
        this.setState({ isConfirmFocus: false });
    }
    handleSignup() {
        if (this.state.password !== this.state.confirm) {
            Toast.show({
                text: "Passwords didn't match. Try again.",
                duration: 3000,
                style: { backgroundColor: '#50ACDF' },
            });
            return;
        }
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('nickname', this.state.nickname);
        data.append('password', this.state.password);
        fetch(serverDomain + 'login/signup/', { method: 'POST', body: data })
            .then(response => response.json())
            .then(signupMessage => {
                if (signupMessage.isSignup) {
                    Toast.show({
                        text: 'Register successfully!',
                        duration: 3000,
                        style: { backgroundColor: '#50ACDF' },
                    });
                    this.props.onSwitchPage('login');
                } else if (signupMessage.isDuplicateUsername) {
                    Toast.show({
                        text: 'Username already exists. Try again.',
                        duration: 3000,
                        style: { backgroundColor: '#50ACDF' },
                    });
                }
            })
            .catch(reason => console.log(reason));
    }

    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header>
                        <Left />
                        <Body>
                            <Title>Sign up</Title>
                        </Body>
                        <Right>
                            <Button
                                hasText
                                transparent
                                onPress={() => this.props.onSwitchPage('login')}
                            >
                                <Text>Log in</Text>
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Image
                            source={
                                this.state.isPasswordFocus ||
                                this.state.isConfirmFocus
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
                                <Label style={styles.inputTitle}>
                                    New Username
                                </Label>
                                <Input
                                    placeholder={'Create your username'}
                                    onChangeText={username =>
                                        this.setState({ username })
                                    }
                                    clearButtonMode={'while-editing'}
                                />
                            </Item>
                            <Item fixedLabel>
                                <Label style={styles.inputTitle}>
                                    Nickname
                                </Label>
                                <Input
                                    placeholder={'Create your nickname'}
                                    onChangeText={nickname =>
                                        this.setState({ nickname })
                                    }
                                    clearButtonMode={'while-editing'}
                                />
                            </Item>
                            <Item fixedLabel>
                                <Label style={styles.inputTitle}>
                                    New Password
                                </Label>
                                <Input
                                    placeholder={'Create your password'}
                                    secureTextEntry={true}
                                    onFocus={this.handlePasswordFocus}
                                    onBlur={this.handlePasswordBlur}
                                    onChangeText={password =>
                                        this.setState({ password })
                                    }
                                    clearButtonMode={'while-editing'}
                                />
                            </Item>
                            <Item fixedLabel last>
                                <Label style={styles.inputTitle}>Confirm</Label>
                                <Input
                                    placeholder={'Re-enter password'}
                                    secureTextEntry={true}
                                    onFocus={this.handleConfirmFocus}
                                    onBlur={this.handleConfirmBlur}
                                    onChangeText={confirm =>
                                        this.setState({ confirm })
                                    }
                                    clearButtonMode={'while-editing'}
                                />
                            </Item>
                        </Form>
                        <Row style={{ height: 20 }} />
                        <Row>
                            <Col size={5} />
                            <Col size={90}>
                                <Button
                                    primary
                                    style={styles.textCenter}
                                    disabled={
                                        this.state.username.length === 0 ||
                                        this.state.password.length === 0 ||
                                        this.state.confirm.length === 0
                                    }
                                    onPress={this.handleSignup}
                                >
                                    <Text>Create Account</Text>
                                </Button>
                            </Col>
                            <Col size={5} />
                        </Row>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}
