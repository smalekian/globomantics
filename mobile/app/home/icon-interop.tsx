import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';

//@ts-ignore
cssInterop(Feather.Button, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true, color: true },
  },
});

//@ts-ignore
cssInterop(FontAwesome.Button, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true, color: true },
  },
});

//@ts-ignore
cssInterop(MaterialCommunityIcons.Button, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: true, width: true, size: true, color: true },
  },
});
