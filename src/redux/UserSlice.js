import { createSlice } from '@reduxjs/toolkit';

// Sample users for demonstration
const initialUsers = [
  {
    id: 'user1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: null,
    bio: 'Passionate storyteller and nature lover. I believe every moment has a story worth sharing.',
    followers: ['user2'],
    following: ['user3'],
    joinedDate: '2024-01-15',
    isVerified: false
  },
  {
    id: 'user2', 
    name: 'James Carter',
    email: 'james@example.com',
    avatar: null,
    bio: 'Adventure seeker and writer. Sharing tales from around the world.',
    followers: ['user3'],
    following: ['user1'],
    joinedDate: '2024-02-20',
    isVerified: true
  },
  {
    id: 'user3',
    name: 'Maria Rodriguez',
    email: 'maria@example.com', 
    avatar: null,
    bio: 'Tech enthusiast and creative writer. Building bridges between technology and humanity.',
    followers: ['user1'],
    following: ['user2'],
    joinedDate: '2024-03-10',
    isVerified: false
  }
];

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: initialUsers,
    currentUser: null,
    notifications: []
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    
    followUser: (state, action) => {
      const { followerId, followeeId } = action.payload;
      
      // Add to follower's following list
      const follower = state.users.find(user => user.id === followerId);
      if (follower && !follower.following.includes(followeeId)) {
        follower.following.push(followeeId);
      }
      
      // Add to followee's followers list  
      const followee = state.users.find(user => user.id === followeeId);
      if (followee && !followee.followers.includes(followerId)) {
        followee.followers.push(followerId);
      }
      
      // Add notification
      state.notifications.push({
        id: Date.now(),
        type: 'follow',
        fromUserId: followerId,
        toUserId: followeeId,
        message: `${follower?.name || 'Someone'} started following you`,
        timestamp: Date.now(),
        read: false
      });
    },
    
    unfollowUser: (state, action) => {
      const { followerId, followeeId } = action.payload;
      
      // Remove from follower's following list
      const follower = state.users.find(user => user.id === followerId);
      if (follower) {
        follower.following = follower.following.filter(id => id !== followeeId);
      }
      
      // Remove from followee's followers list
      const followee = state.users.find(user => user.id === followeeId);
      if (followee) {
        followee.followers = followee.followers.filter(id => id !== followerId);
      }
    },
    
    updateUserProfile: (state, action) => {
      const { userId, updates } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        Object.assign(user, updates);
      }
    },
    
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        timestamp: Date.now(),
        read: false,
        ...action.payload
      });
    },
    
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});

export const {
  setCurrentUser,
  followUser,
  unfollowUser,
  updateUserProfile,
  addNotification,
  markNotificationAsRead,
  clearNotifications
} = userSlice.actions;

export default userSlice.reducer;