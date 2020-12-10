import React from 'react';
import { Router, Stack, Scene, Tabs } from 'react-native-router-flux';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Feed from './Feed/Feed';
import AddPost from './Post/AddPost';
import ConfigPost from './ConfigPost/ConfigPost.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const FeedIcon = () => <Ionicons name="md-home" size={25} />;
const AddPostIcon = () => <EvilIcons name="plus" size={25} />;

const RouterMenu = () => (
  <Router>
    <Stack key="root">
      <Stack key="auth" hideNavBar>
        <Scene key="login" component={Login} />
        <Scene key="signup" component={Signup} />
      </Stack>
      <Stack key="app" hideNavBar panHandlers={null}>
        <Tabs showLabel={false}>
          <Scene key="feed" component={Feed} icon={FeedIcon} title="Feed" />
          <Scene key="addpost" component={AddPost} icon={AddPostIcon} hideNavBar hideTabBar />
        </Tabs>
        <Scene key="configPost" component={ConfigPost} />
      </Stack>
    </Stack>
  </Router>
);

export default RouterMenu;