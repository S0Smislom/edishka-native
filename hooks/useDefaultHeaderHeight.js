import { Platform } from 'react-native'
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'

export function useDefaultHeaderHeight() {
  // Get default height
  // const isIPhone = Platform.OS === 'ios' && !(Platform.isPad || Platform.isTV);
  const insets = useSafeAreaInsets()
  const frame = useSafeAreaFrame()
  // const isModal = false;
  // const isLandscape = frame.width > frame.height;

  // const topInset =
  //   false ||
  //   (Platform.OS === 'ios' && isModal) ||
  //   (isIPhone && isLandscape)
  //     ? 0
  //     : insets.top;
  // console.log(topInset)
  const height = getDefaultHeaderHeight(frame, false, insets.top)
  return height
}
