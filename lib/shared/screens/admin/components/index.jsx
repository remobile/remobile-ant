import React, {PropTypes} from 'react';
import { TabBar } from 'antd-mobile';
import styles from './index.less';
import Home from './home';

export default class Admin extends React.Component {
    state = {
        selectedTab: 0,
        notifCount: 0,
    };
    renderPage(index) {
        if (index ===0) {
            return <Home />
        }
        return (
            <div style={{ backgroundColor: 'white', height: '100%' }}>
                {index}
            </div>
        );
    }
    changeTab(index) {
        if (index === 1) {
            let {notifCount} = this.state;
            this.setState({selectedTab: index, notifCount: notifCount+1});
        } else {
            this.setState({selectedTab: index});
        }
    }
    render() {
        const {notifCount} = this.state;
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                >
                <TabBar.Item
                    title="生活"
                    key="生活"
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/XLdKiKAwDRXQNhC.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/iKfBQdGdTMubhXy.png' }}
                    selected={this.state.selectedTab === 0}
                    onPress={this.changeTab.bind(this, 0)}
                    >
                    {this.renderPage(0)}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
                    title="口碑"
                    key="口碑"
                    badge={notifCount||undefined}
                    selected={this.state.selectedTab === 1}
                    onPress={this.changeTab.bind(this, 1)}
                    >
                    {this.renderPage(1)}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/EljxLrJEShWZObW.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/LWNaMdwAFSmYBFw.png' }}
                    title="朋友"
                    key="朋友"
                    selected={this.state.selectedTab === 2}
                    onPress={this.changeTab.bind(this, 2)}
                    >
                    {this.renderPage(2)}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/YWpPVCVOnJoCYhs.png' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/WadBBxOIZtDzsgP.png' }}
                    title="我的"
                    key="我的"
                    selected={this.state.selectedTab === 3}
                    onPress={this.changeTab.bind(this, 3)}
                    >
                    {this.renderPage(3)}
                </TabBar.Item>
            </TabBar>
        );
    }
}
