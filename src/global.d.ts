declare module '@/config/firebase.config' {
    import { Auth } from 'firebase/auth';
    const auth: Auth;
    export { auth };
}

declare module '@/config/formKit.config' {
    const configFormKit: any;
    export default configFormKit;
  }
  
//   // src/types/formkit.d.ts
declare module '@formkit/vue' {
  import { plugin } from '@formkit/vue';
  const plugin: plugin;
  // const defaultConfig: any;
  export { plugin };
}
  