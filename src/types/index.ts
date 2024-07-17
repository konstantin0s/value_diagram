import { ContainerState as AppContainerState } from '../containers/App/types';
/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  app: AppContainerState;
}
