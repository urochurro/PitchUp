import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

type Props = {
  children: React.ReactNode;
  color?: string; // Optional color prop
};

const Header = ({ children, color }: Props) => (
  <Text style={[styles.header, { color: color || theme.colors.secondary }]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
  },
});

export default memo(Header);

// import React, { memo } from 'react';
// import { StyleSheet, Text } from 'react-native';
// import { theme } from '../core/theme';

// type Props = {
//   children: React.ReactNode;
// };

// const Header = ({ children }: Props) => (
//   <Text style={styles.header}>{children}</Text>
// );

// const styles = StyleSheet.create({
//   header: {
//     fontSize: 26,
//     color: theme.colors.secondary,
//     fontWeight: 'bold',
//     paddingVertical: 14,
//   },
// });

// export default memo(Header);
