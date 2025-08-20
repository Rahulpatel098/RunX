import React, { useState } from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'react-native-paper';
import { useAuth } from '../context/authContext';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Homeheader = () => {
  const { top } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState<boolean | null>(false);

  const handleLogOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { paddingTop: Platform.OS === 'ios' ? top : top + 10 },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>🏠 HomeScreen</Text>

        <TouchableOpacity onPress={handleLogOut} style={styles.logoutButton}>
          {loading ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Icon source="logout" size={28} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#6366f1', // Indigo-500
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(3),
    fontWeight: '700',
    color: 'white',
  },
  logoutButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});

export default Homeheader;
