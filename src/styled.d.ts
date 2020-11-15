import 'styled-components';
import { ITheme } from './utils/theme';

declare module 'styled-components' {
    export interface DefaultTheme extends ITheme {

    }
}