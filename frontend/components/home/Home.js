import React, { Component } from 'react';
import {
    Button,
    Container,
    Content,
    Header,
    Right,
    StyleProvider,
    Icon,
} from 'native-base';
import { color } from '../../styles';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';
import Card from './Card';
import Metrics from './Metrics';
import Info from './Info';
import { WebView } from 'react-native-webview';
import { serverDomain } from '../../config';

export default class Home extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container style={{ backgroundColor: color.grey }}>
                    <Header
                        transparent
                        style={{ backgroundColor: 'white', height: 35 }}
                    >
                        <Right>
                            <Button
                                transparent
                                onPress={() => {
                                    this.props.onSwitchPage('settings');
                                }}
                            >
                                <Icon
                                    name={'setting'}
                                    type={'AntDesign'}
                                    style={{
                                        color: 'grey',
                                        fontSize: 20,
                                    }}
                                />
                            </Button>
                        </Right>
                    </Header>
                    <Info
                        goto={this.props.goto}
                        avatar={this.props.avatar}
                        nickname={this.props.nickname}
                        level={this.props.level}
                        coin={this.props.coin}
                    />
                    <Metrics
                        metrics={[
                            { key: 'Height', val: this.props.height },
                            { key: 'Weight', val: this.props.weight },
                            { key: 'BMI', val: this.props.BMI },
                        ]}
                    />
                    <Content>
                        <Card
                            title={'Diet'}
                            height={280}
                            topScale={1}
                            botScale={5}
                        >
                            <WebView
                                scalesPageToFit={false}
                                decelerationRate={'normal'}
                                source={{
                                    uri: serverDomain + 'home/dietTable',
                                }}
                            />
                        </Card>
                        <Card
                            title={'Fitness'}
                            height={280}
                            topScale={1}
                            botScale={5}
                        >
                            <WebView
                                scalesPageToFit={false}
                                decelerationRate={'normal'}
                                source={{
                                    uri: serverDomain + 'static/WildSaturday_fitness.html',
                                }}
                            />
                        </Card>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}
