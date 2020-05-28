import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
    Button,
    Container,
    Content,
    Header,
    Right,
    StyleProvider,
    Icon,
    Left,
    Body,
    Text,
    Toast,
} from 'native-base';
import { color } from '../../styles';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';
import PersonalInfoList from './PersonalInfoList';
import Dialog from 'react-native-dialog';
import { serverDomain } from '../../config';

export default class InfoSetting extends Component {
    constructor() {
        super();
        this.state = {
            dialogTitle: '',
            showDialog: false,
            updateIndex: -1,
            updateInfo: '',
        };
        this.handleOnPress = this.handleOnPress.bind(this);
        this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
    }

    handleUpdateInfo() {
        let title = this.props.dataArray[this.state.updateIndex].key;
        const data = new FormData();
        data.append('sessionID', this.props.session);
        data.append(title.toLowerCase(), this.state.updateInfo);
        fetch(serverDomain + 'home/updateInfo/', {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(Message => {
                if (Message.isInfoUpdated) {
                    Toast.show({
                        text: title + ' is updated',
                        duration: 3000,
                        position: 'top',
                        style: { backgroundColor: '#50ACDF' },
                    });
                    this.props.onChange();
                    this.setState({ showDialog: false });
                } else {
                    Toast.show({
                        text: 'Update Failed',
                        duration: 3000,
                        position: 'top',
                        style: { backgroundColor: '#50ACDF' },
                    });
                }
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    handleOnPress(index) {
        if (index < 1) {
            ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
                cropperCircleOverlay: true,
                compressImageMaxWidth: 400,
                compressImageMaxHeight: 400,
            })
                .then(image => {
                    const data = new FormData();
                    data.append('sessionID', this.props.session);
                    data.append('avatar', {
                        uri: image.path,
                        name: image.filename,
                    });
                    fetch(serverDomain + 'home/updateAvatar/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'multipart/form-data' },
                        body: data,
                    })
                        .then(response => response.json())
                        .then(Message => {
                            if (Message.isAvatarUpdated) {
                                Toast.show({
                                    text: 'Avatar is updated',
                                    duration: 3000,
                                    style: { backgroundColor: '#50ACDF' },
                                });
                                this.props.onChange();
                            } else {
                                Toast.show({
                                    text:
                                        'Update Failed' +
                                        Message.message.avatar[0],
                                    duration: 3000,
                                    style: { backgroundColor: '#50ACDF' },
                                });
                            }
                        })
                        .catch(reason => console.log(reason));
                })
                .catch(reason => console.log(reason));
        } else {
            if (
                this.props.dataArray[index].editable &&
                !this.state.showDialog
            ) {
                this.setState({
                    dialogTitle: this.props.dataArray[index].key,
                    showDialog: true,
                    updateIndex: index,
                });
            }
        }
    }

    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container style={{ backgroundColor: color.grey }}>
                    <Dialog.Container visible={this.state.showDialog}>
                        <Dialog.Title>
                            {'Enter ' + this.state.dialogTitle}
                        </Dialog.Title>
                        <Dialog.Description>
                            {'Please enter your ' +
                                this.state.dialogTitle.toLowerCase()}
                        </Dialog.Description>
                        <Dialog.Input
                            onChangeText={info =>
                                this.setState({ updateInfo: info })
                            }
                        />
                        <Dialog.Button
                            label={'Cancel'}
                            onPress={() => {
                                this.setState({ showDialog: false });
                            }}
                        />
                        <Dialog.Button
                            label={'OK'}
                            onPress={this.handleUpdateInfo}
                        />
                    </Dialog.Container>
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
                            <Text>Personal Info</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <PersonalInfoList
                            dataArray={this.props.dataArray}
                            onPress={this.handleOnPress}
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}
