import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import styles from './style';
import { connect } from 'react-redux';
import { getSongs } from '../../redux/actions/fileActions';

import { IState } from './interfaces/State';
import { IProps } from './interfaces/Props';

class HomeScreen extends Component<IProps, IState> {

    componentDidMount() {
        this.props.getSongs();
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.text}>HomeScreen</Text>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({fileReducer}: any) => {
    return {
        fileReducer
    }
}

const mapDispatchToProps = {
    getSongs
}

export default connect<any>(mapStateToProps, mapDispatchToProps)(HomeScreen);